export default function Guitar({ guitar, addToCart }: GuitarProps) {
  const { brand, name, image, description, price } = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4">
      {/* Contenedor principal de la tarjeta con sombra y efecto hover */}
      <div 
        className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden" 
        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
        }}
      >
        <div className="row g-0 h-100 align-items-center bg-white">
          
          {/* Columna de la Imagen */}
          <div className="col-5 p-3 text-center">
            <img
              className="img-fluid drop-shadow"
              src={`/img/${image}.jpg`}
              alt={`Guitarra ${name}`}
              style={{ 
                maxHeight: "260px", 
                objectFit: "contain",
                filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.2))" 
              }}
            />
          </div>

          {/* Columna de la Información */}
          <div className="col-7">
            <div className="card-body p-3 p-xl-4 d-flex flex-column h-100 justify-content-center">
              
              <h6 
                className="text-muted text-uppercase mb-1 fw-bold" 
                style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
              >
                {brand}
              </h6>
              
              <h3 className="text-black fs-5 fw-bold mb-2 lh-sm">
                {name}
              </h3>
              
              <p 
                className="text-secondary small mb-3" 
                style={{ 
                  display: "-webkit-box", 
                  WebkitLineClamp: 3, 
                  WebkitBoxOrient: "vertical", 
                  overflow: "hidden" 
                }}
              >
                {description}
              </p>
              
              <p className="fw-black text-primary fs-3 mb-3">
                ${price}
              </p>
              
              <button
                type="button"
                className="btn btn-dark w-100 rounded-3 py-2 fw-bold text-uppercase shadow-sm"
                onClick={() => addToCart(guitar)}
              >
                Agregar al Carrito
              </button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}