import html2canvas from 'html2canvas';
import React, { useEffect, useState, useRef} from 'react'

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
