// src/components/pages/AboutUs.tsx
import React from "react";

export default function Sec4() {
  return (
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="mb-5">
          <div className="row align-items-start" style={{ gap: 12 }}>
            {/* Portrait */}
            <div className="col-md-3">
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(15,24,65,.08)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=640&auto=format&fit=crop"
                  alt="Founder portrait"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            {/* Intro copy */}
            <div className="col-md-9">
              <p>
                Escape Chores, LLC is a veteran-owned, woman-led cleaning company dedicated to
                delivering exceptional post-construction cleaning and janitorial services. Led by CEO
                Raven Bernard, a retired Navy veteran with a commitment to precision, discipline, and
                excellence, we proudly serve businesses and builders who need dependable quality.
              </p>
            </div>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="mb-5">
          <h5 className="mb-3" style={{ fontWeight: 800 }}>Core Competencies</h5>

          <div className="mb-3">
            <h6 className="mb-2" style={{ fontWeight: 700 }}>Post-Construction Cleaning:</h6>
            <ul className="pl-3" style={{ lineHeight: 1.75 }}>
              <li>Comprehensive debris removal and site cleanup.</li>
              <li>Dusting, vacuuming, and surface polishing to remove fine construction residue.</li>
              <li>Detailed cleaning of fixtures, windows, and floors to prepare spaces for occupancy.</li>
              <li>Adherence to safety and environmental standards.</li>
            </ul>
          </div>

          <div className="mb-3">
            <h6 className="mb-2" style={{ fontWeight: 700 }}>Janitorial Services:</h6>
            <ul className="pl-3" style={{ lineHeight: 1.75 }}>
              <li>Daily, weekly, or customized schedules for offices, retail spaces, and industrial facilities.</li>
              <li>Sanitization of high-touch areas to promote health and hygiene.</li>
              <li>Floor care, including sweeping, mopping, and waxing.</li>
              <li>Trash disposal, restocking supplies, and maintaining restroom facilities.</li>
            </ul>
          </div>

          <div>
            <h6 className="mb-2" style={{ fontWeight: 700 }}>Specialized Services:</h6>
            <ul className="pl-3" style={{ lineHeight: 1.75 }}>
              <li>Deep cleaning and sanitization services for health-critical environments.</li>
              <li>Eco-friendly cleaning solutions tailored to client needs.</li>
            </ul>
          </div>
        </div>

        {/* Differentiators */}
        <div className="mb-5">
          <h5 className="mb-3" style={{ fontWeight: 800 }}>Differentiators</h5>
          <ul className="pl-3" style={{ lineHeight: 1.75 }}>
            <li><strong>Veteran Leadership:</strong> Navy background instills discipline, reliability, and excellence.</li>
            <li><strong>Locally Rooted:</strong> Deep understanding of Hampton Roads community needs.</li>
            <li><strong>Customized Solutions:</strong> Tailored services for each client’s requirements.</li>
            <li><strong>Eco-Conscious:</strong> Commitment to environmentally friendly products and methods.</li>
            <li><strong>Customer-Centric:</strong> Transparent communication and long-term relationships.</li>
          </ul>
        </div>

        {/* Past Performance */}
        <div className="mb-5">
          <h5 className="mb-3" style={{ fontWeight: 800 }}>Past Performance</h5>
          <ul className="pl-3" style={{ lineHeight: 1.75 }}>
            <li>Delivered post-construction cleaning for commercial and residential projects.</li>
            <li>Provided janitorial services that improved workplace cleanliness and productivity.</li>
            <li>Partnered with contractors and property managers to meet tight deadlines and quality standards.</li>
          </ul>
        </div>

        {/* Certifications and Qualifications */}
        <div className="mb-4">
          <h5 className="mb-3" style={{ fontWeight: 800 }}>Certifications and Qualifications</h5>
          <ul className="pl-3" style={{ lineHeight: 1.75 }}>
            <li>Veteran-Owned Small Business (VOSB).</li>
            <li>Insured and bonded for client peace of mind.</li>
            <li>Team trained in OSHA compliance and industry best practices.</li>
          </ul>
        </div>

        {/* Services Offered (compact list) */}
        <div>
          <h6 className="mb-2" style={{ fontWeight: 700 }}>Services offered:</h6>
          <ul className="pl-3" style={{ lineHeight: 1.75 }}>
            <li>Post construction cleaning</li>
            <li>Move-in / Move-out cleaning</li>
            <li>Daily / Weekly Janitorial Services</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
