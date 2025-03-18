import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function VisitorDashboard() {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <div className="w-3/4">
      <Slide>
        <div className="each-slide-effect h-96">
          <div
            style={{ backgroundImage: `url(${images[0]})`, height: "100%" }}
            className="flex items-center justify-center bg-cover bg-center"
          >
            <span className="text-white text-2xl font-bold">
              Contact the prison or check their website for visitation rules,
              schedules, and regulations. Some prisons require visitors to be on
              an approved visitor list, so confirm if you need prior approval.
            </span>
          </div>
        </div>
        <div className="each-slide-effect h-96">
          <div
            style={{ backgroundImage: `url(${images[1]})`, height: "100%" }}
            className="flex items-center justify-center bg-cover bg-center"
          >
            <span className="text-white text-2xl font-bold">
              Bring a valid government-issued ID (e.g., driver’s license,
              passport). If required, complete any necessary forms before the
              visit.
            </span>
          </div>
        </div>
        <div className="each-slide-effect h-96">
          <div
            style={{ backgroundImage: `url(${images[2]})`, height: "100%" }}
            className="flex items-center justify-center bg-cover bg-center"
          >
            <span className="text-white text-2xl font-bold">
              Maintain appropriate conduct—no loud talking, disruptive behavior,
              or excessive physical contact. Some prisons allow brief hugs and
              handshakes; others may have no-contact visits (through glass).
            </span>
          </div>
        </div>
        <div className="each-slide-effect h-96">
          <div
            style={{ backgroundImage: `url(${images[0]})`, height: "100%" }}
            className="flex items-center justify-center bg-cover bg-center"
          >
            <span className="text-white text-2xl font-bold">
              <h2>Schedule the Visit</h2>
              Some facilities require visits to be scheduled in advance. Check
              the available visiting hours and days.
            </span>
          </div>
        </div>
        <div className="each-slide-effect h-96">
          <div
            style={{ backgroundImage: `url(${images[1]})`, height: "100%" }}
            className="flex items-center justify-center bg-cover bg-center"
          >
            <span className="text-white text-2xl font-bold">
              <h2>Arrive Early & Go Through Security</h2>
              Arriving early allows time for security checks. Be prepared for
              metal detectors, pat-downs, or other security screenings.
            </span>
          </div>
        </div>
        <div className="each-slide-effect h-96">
          <div
            style={{ backgroundImage: `url(${images[2]})`, height: "100%" }}
            className="flex items-center justify-center bg-cover bg-center"
          >
            <span className="text-white text-2xl font-bold">
              <h2>Respect Time Limits</h2>
              Visits are often timed, so be mindful of the duration.
            </span>
          </div>
        </div>
      </Slide>
    </div>
  );
}

export default VisitorDashboard;
