import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LandingPage({ properties = [] }) {
  const featuredItems = properties.length > 0 ? properties.slice(0, 3) : [];
  const carouselItems = properties.length > 0 ? properties.slice(0, 5) : [];
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevCarousel = () => {
    if (!carouselItems || carouselItems.length === 0) return;
    setCarouselIndex((i) => (i - 1 + carouselItems.length) % carouselItems.length);
  };

  const nextCarousel = () => {
    if (!carouselItems || carouselItems.length === 0) return;
    setCarouselIndex((i) => (i + 1) % carouselItems.length);
  };

  const translatePercent = carouselItems && carouselItems.length > 0 ? carouselIndex * 100 : 0;

  useEffect(() => {
    // Safely initialize carousel if Bootstrap is loaded
    if (window && window.bootstrap && carouselItems.length > 0) {
      const carouselElement = document.getElementById('propertyCarousel');
      if (carouselElement) {
        try {
          new window.bootstrap.Carousel(carouselElement, {
            interval: 5000,
            wrap: true,
          });
        } catch (e) {
          console.log('Carousel initialized via data attributes');
        }
      }
    }
  }, [carouselItems]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}
          >
            Your Next Dream Vacation Awaits
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: '300',
              marginBottom: '40px',
              maxWidth: '700px',
              margin: '0 auto 40px',
              opacity: 0.95,
              lineHeight: 1.7,
            }}
          >
            Book premium vacation homes and resorts at unbeatable prices. Experience luxury, create memories, find your perfect getaway.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                padding: '14px 40px',
                background: '#ff6b6b',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '700',
                textDecoration: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ff5252';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 25px rgba(255, 107, 107, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ff6b6b';
                e.target.style.transform = 'none';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
              }}
            >
              Start Booking
            </Link>
            <Link
              to="/properties"
              style={{
                display: 'inline-block',
                padding: '14px 40px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontWeight: '700',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'none';
              }}
            >
              Explore Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div style={{ padding: '80px 20px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '15px',
                color: '#1e3c72',
              }}
            >
              Featured Properties
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Handpicked luxury accommodations from across the country
            </p>
          </div>

          {featuredItems.length > 0 ? (
            <>
              {/* Carousel: shows image + place + name (no price) */}
              {carouselItems.length > 0 && (
                <div style={{ position: 'relative', marginBottom: '30px' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
                    <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${translatePercent}%)` }}>
                      {carouselItems.map((p) => (
                        <div key={p.id} style={{ minWidth: '100%', height: 320, position: 'relative' }}>
                          <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          <div style={{ position: 'absolute', left: 20, bottom: 20, background: 'rgba(0,0,0,0.55)', color: 'white', padding: '10px 16px', borderRadius: 8 }}>
                            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{p.name}</div>
                            <div style={{ opacity: 0.9, fontSize: '0.95rem' }}>📍 {p.state}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={prevCarousel} aria-label="Previous" style={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer' }}>‹</button>
                  <button onClick={nextCarousel} aria-label="Next" style={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer' }}>›</button>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', marginBottom: '40px' }}>
              {featuredItems.map((property) => (
                <div
                  key={property.id}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                    <img
                      src={property.image}
                      alt={property.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: '#ff6b6b',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                      }}
                    >
                      ₹{property.price}/night
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '25px' }}>
                    <h3
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: '800',
                        marginBottom: '8px',
                        color: '#1e3c72',
                      }}
                    >
                      {property.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#666',
                        marginBottom: '15px',
                      }}
                    >
                      📍 {property.state}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '15px',
                        paddingBottom: '15px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>
                        🏷️ {property.type}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>
                        👥 {property.capacity} guests
                      </span>
                    </div>
                    <button
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#1e3c72',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#0d1f3c';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#1e3c72';
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            </>
          ) : null}

          {/* Removed 'View All Properties' CTA per request */}
        </div>
      </div>

      {/* Why StayEase Section */}
      <div style={{ background: '#f0f5ff', padding: '80px 20px' }}>
        <div className="container">
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              marginBottom: '60px',
              color: '#1e3c72',
              textAlign: 'center',
            }}
          >
            Why Choose StayEase?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { icon: '🏠', title: 'Premium Properties', desc: 'Handpicked luxurious homes and resorts' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive rates with no hidden charges' },
              { icon: '🔒', title: 'Secure Booking', desc: 'Safe and secure payment processing' },
              { icon: '📞', title: '24/7 Support', desc: 'Dedicated customer support anytime' },
            ].map((feature, idx) => (
              <div key={idx} style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: '#1e3c72' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: '#1e3c72', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>
            Ready to Book Your Dream Vacation?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 }}>
            Join thousands of happy travelers who found their perfect stay
          </p>
          <Link
            to="/register"
            style={{
              display: 'inline-block',
              padding: '14px 45px',
              background: '#ff6b6b',
              color: 'white',
              borderRadius: '8px',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#ff5252';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ff6b6b';
              e.target.style.transform = 'none';
            }}
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}


export default LandingPage;
