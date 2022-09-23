### Nextjs pdf splinter


## Introduction

A 3- Dimentional Card is simply a normal card capable developed and produced with 3D graphics and animation features. Usecases of such cases range from webdesign, ads and other marketing methods.This article demonstares how the Nextjs framework can be implemented to produce a 3D illusion photo from an image. We create a poster that sells a tshirt. Its animation will be determined by the user's mouse movement.

## Codesandbox

Check the sandbox demo on  [Codesandbox](/).

<CodeSandbox
title="js_3dEffect"
id=" "
/>

You can also get the project Github repo using [Github](/).

## Prerequisites

Entry-level javascript and React/Nextjs knowledge.

## Setting Up the Sample Project

In your respective folder, create a new nextjs app using `npx create-next-app 3dimage` in your terminal.
Head to your project root directory `cd 3dimage`
 
Nextjs has its own serverside rendering backend which we will use for our media files upload. 
Set up [Cloudinary](https://cloudinary.com/?ap=em)  for our backend. 

Create your Cloudinary account using this [Link](https://cloudinary.com/console).
Log in to a dashboard containing the environment variable keys necessary for the Cloudinary integration in our project.

Include Cloudinary in your project dependencies: `npm install cloudinary`.

Create a new file named `.env.local` and paste the following guide to fill your environment variables. You locate your variables from the Cloudinary dashboard.

```
CLOUDINARY_CLOUD_NAME =

CLOUDINARY_API_KEY =

CLOUDINARY_API_SECRET =
```

Restart your project: `npm run dev`.

In the `pages/api` directory, create a new file named `upload.js`. 
Start by configuring the environment keys and libraries.

```
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

Create a handler function to execute the POST request. The function will receive media file data and post it to the Cloudinary website. It then captures the media file's Cloudinary link and sends it back as a response.

```
export default async function handler(req, res) {
    if (req.method === "POST") {
        let url = ""
        try {
            let fileStr = req.body.data;
            const uploadedResponse = await cloudinary.uploader.upload_large(
                fileStr,
                {
                    resource_type: "video",
                    chunk_size: 6000000,
                }
            );
            url = uploadedResponse.url
        } catch (error) {
            res.status(500).json({ error: "Something wrong" });
        }

        res.status(200).json({data: url});
    }
}
```
The code above concludes our backend.

In our front end, The following UI is what we will create:

![complete UI](https://res.cloudinary.com/dogjmmett/image/upload/v1663929357/Screenshot_2022-09-23_at_13.35.12_duzhef.png "complete UI")

## note
As mentioned before, this app will include an online storage feature. Once the card design is complete, we will use `html2canvas` script to screenshoot the card for ssr upload.

Include the script in your dependency:

```
npm install html2canvas
```

Include the necessary imports in the home component. THat includes the `UseEffect` assign DOM elements to variables for animation, `useState` hook to capture online link for uploaded card and display it to the user and `useRef` hook to reffrence DOM elements inside our functions.
Go ahead and declare the following in the home function

```
"pages/index"

export default function Home() {
  let container, card, title, sneaker, purchase, description, sizes;

  const [link, setLink] = useState(false);

  const cardRef = useRef();

    return(
        <div></div>
    )
}
```


Put all components in their respective locations inside the page. Replace the return statement with the following code. The css files can be located inside the GitHub repository.

```
"pages/index.js"

export default function Home() {
  let container, card, title, sneaker, purchase, description, sizes;

  const [link, setLink] = useState(false);

  const cardRef = useRef();
  
    return (
        <div>
            <div className="container">
                <div className="card" ref={cardRef} onClick={captionHandler}>
                <div className="sneaker">
                    <div className="circle"></div>
                    <img src="images/shirt.png" alt="adidas" />
                </div>
                <div className="info">
                    <h1 className="title">Tshirt cloudinary</h1>
                    <h3>
                    3D Card Demo.
                    </h3>
                    <div className="sizes">
                    <button>S</button>
                    <button>M</button>
                    <button className="active">L</button>
                    <button>44</button>
                    </div>
                    <div className="purchase">
                    <button>Purchase</button>
                    </div>
                </div>
                </div>
            <div className="right">
            <h1 style={{marginBottom: "10%"}}>Javascript 3D card Effect</h1>
            <h2 style={{marginBottom: "10%"}}>Click card to get online Caption</h2>
            {link && <a href={link}>CaptionLink</a>}
        </div>
        </div>
        </div>
  )
}
```

Include the following code. The `useEffect` will assign DOM elements to the respective variables and pass the variables to another function `animationHandler` where we shall implement the 3D effect.

```
"pages/index.js"

export default function Home() {
  let container, card, title, sneaker, purchase, description, sizes;

  const [link, setLink] = useState(false);

  const cardRef = useRef();
  

  useEffect(() => {
    container = document.querySelector(".container");
    card = document.querySelector(".card");
    title = document.querySelector(".title");
    sneaker = document.querySelector(".sneaker img");
    purchase = document.querySelector(".purchase button");
    description = document.querySelector(".info h3");
    sizes = document.querySelector(".sizes");

    animation(container, card, title, sneaker, purchase, description, sizes);
  }, []);

  const animation = () => {

  }

    return (
        <div>
            <div className="container">
                <div className="card" ref={cardRef} onClick={captionHandler}>
                <div className="sneaker">
                    <div className="circle"></div>
                    <img src="images/shirt.png" alt="adidas" />
                </div>
                <div className="info">
                    <h1 className="title">Tshirt cloudinary</h1>
                    <h3>
                    3D Card Demo.
                    </h3>
                    <div className="sizes">
                    <button>S</button>
                    <button>M</button>
                    <button className="active">L</button>
                    <button>44</button>
                    </div>
                    <div className="purchase">
                    <button>Purchase</button>
                    </div>
                </div>
                </div>
            <div className="right">
            <h1 style={{marginBottom: "10%"}}>Javascript 3D card Effect</h1>
            <h2 style={{marginBottom: "10%"}}>Click card to get online Caption</h2>
            {link && <a href={link}>CaptionLink</a>}
        </div>
        </div>
        </div>
  )
}
```

We will only animate the container by tracking mouse movement. The mouse will rotate, scale, skew, or translate the card element.

```
"pages/index.js"

const animation = () => {
    container.addEventListener("mouseenter", (e) => {
      card.style.transition = "none";
      title.style.transform = "translateZ(150px)";
      sneaker.style.transform = "translateZ(200px) rotateZ(-45deg)";
      description.style.transform = "translateZ(125px)";
      sizes.style.transform = "translateZ(100px)";
      purchase.style.transform = "translateZ(75px)";
    });
    
    container.addEventListener("mousemove", (e) => {
      let x = (window.innerWidth / 2 - e.pageX) / 20;
      let y = (window.innerHeight / 2 - e.pageY) / 20;
      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
    
    container.addEventListener("mouseleave", (e) => {
      card.style.transition = "all 0.5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      title.style.transform = "translateZ(0px)";
      sneaker.style.transform = "translateZ(0px) rotateZ(0deg)";
      description.style.transform = "translateZ(0px)";
      sizes.style.transform = "translateZ(0px)";
      purchase.style.transform = "translateZ(0px)";
    });
  }

```

Finally, include the `captionHandler` that will activate the upload process.

```
"pages/index"

  const captionHandler = () => {
    html2canvas(cardRef.current).then(canvas => {
      try {
        fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ data: canvas.toDataURL() }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            setLink(data.data);
          });
      } catch (error) {
        console.error(error);
      }
    })
  }
```
 
The function above wil use `html2canvas` to screenshoot the card and upload it to back end as a base64 encoded image. The backend will return the media file's cloudinary which will be acascript acessible to the user.

At this point we have succesfully created a card with 3D features using only javascript.
Feel free to use this article as guide to try other cool javacript features.

Happy coding!