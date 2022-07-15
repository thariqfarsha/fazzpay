import Image from "next/image";
import React, { useState } from "react";
import heroImg from "../public/images/hero-img.png";
import microsoftLogo from "../public/logos/microsoft.png";
import hnmLogo from "../public/logos/hnm.png";
import airbnbLogo from "../public/logos/airbnb.png";
import dropboxLogo from "../public/logos/dropbox.png";
import feature from "../public/images/feature-section-img.png";
import feature1 from "../public/images/feature-img-1.png";
import feature2 from "../public/images/feature-img-2.png";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();

  const user = useSelector((state) => state.user.data);
  if (Object.keys(user).length > 0) {
    router.push("/dashboard");
  }

  const [testi, setTesti] = useState(0);

  const logos = [
    {
      src: microsoftLogo,
      alt: "Microsoft Logo",
    },
    {
      src: dropboxLogo,
      alt: "Dropbox Logo",
    },
    {
      src: hnmLogo,
      alt: "HnM Logo",
    },
    {
      src: airbnbLogo,
      alt: "Air BnB Logo",
    },
  ];

  const abouts = [
    {
      icon: "telephone",
      title: "24 / 7",
      content:
        "We have 24/7 contact support so you can contact us whenever you want and we will respond it.",
    },
    {
      icon: "lock",
      title: "Data Privacy",
      content:
        "We make sure your data is safe in our database and we will encrypt any data you submitted to us.",
    },
    {
      icon: "download",
      title: "Easy Download",
      content:
        "FazzPay is 100% totally free to use it’s now available on Google Play Store and App Store.",
    },
  ];

  const features = [
    {
      title: "Small Fee",
      content: "We only charge 0.5% of every success transaction",
    },
    {
      title: "Secured Data",
      content:
        "All your data is secured properly in our system and it's encrypted",
    },
    {
      title: "User Friendly",
      content:
        "FazzPay come up with modern and sleek design and not complicated",
    },
  ];

  const testimonials = [
    {
      avatar: 56,
      name: "Alex Hansinburg",
      job: "Designer",
      content:
        "This is the most outstanding app that I've ever try in my live. This app is suitable for you who's busy with their bussiness and frequently transfer money. Just try this app and see the power!",
    },
    {
      avatar: 32,
      name: "Sherina Chaw",
      job: "Accountant",
      content:
        "I use this app since 2 years ago and this is the best app that I've ever use in my entire life. I use this app to manage all my financial needs. It's super easy to use and it's 100% free app",
    },
  ];

  const handleNext = () => {
    if (testi < testimonials.length - 1) {
      setTesti((state) => state + 1);
    } else {
      setTesti(0);
    }
  };

  const handlePrev = () => {
    if (testi > 0) {
      setTesti((state) => state - 1);
    } else {
      setTesti(testimonials.length - 1);
    }
  };

  return (
    <>
      <header className="fixed-top bg-primary">
        <div className="container-lg d-flex justify-content-between align-items-center py-3">
          <span className="h3 fw-bold text-white mb-0">FazzPay</span>
          <div>
            <button
              className="btn btn-outline-light px-4 me-3"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-light text-primary px-3"
              onClick={() => router.push("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="pt-5 pt-md-0">
        <section className="hero-section">
          <div className="container-lg h-100">
            <div className="row h-100 overflow-hidden">
              <div className="col-md-6 d-flex align-items-center pt-5 pb-2 px-4 p-md-5">
                <div className="text-center text-md-start">
                  <h1 className="hero-text text-white lh-base fw-extrabold mb-4">
                    Awesome App <br /> For Saving Time.
                  </h1>
                  <p className="text-white fs-5 mb-5">
                    We bring you a mobile app for banking problems that oftenly
                    wasting much of your times.
                  </p>
                  <button className="btn btn-light text-primary px-4 py-2 fs-5 fw-semibold">
                    Try It Now
                  </button>
                </div>
              </div>
              <div className="col-md-6 h-100 pt-5 d-flex align-items-start align-items-md-end justify-content-center">
                <Image
                  src={heroImg}
                  alt="FazzPay mobile app screen"
                  objectFit="contain"
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className="containter-fluid py-4"
          style={{ backgroundColor: "#eff0fc" }}
        >
          <div className="container-lg px-5">
            <div className="row row-cols-2 row-cols-sm-4">
              {logos.map((logo) => (
                <div className="col" key={logo.alt}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    height={100}
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container-fluid py-4 py-md-5">
          <div className="container-lg py-4 text-center">
            <h2 className="h1 fw-extrabold mb-4">
              <span className="text-primary">About</span> the Application.
            </h2>
            <p className="mb-5">
              We have some great features from the application and it's totally
              free <br /> to use by all users around the world.
            </p>
            <div className="row">
              {abouts.map((about) => (
                <div className="col-sm-4 px-4 mb-4 mb-md-0" key={about.icon}>
                  <div className="bg-white rounded px-4 py-5 shadow d-flex flex-column align-items-center h-100">
                    <div
                      className="bg-primary bg-opacity-25 rounded-circle mb-3 d-flex justify-content-center align-items-center"
                      style={{ width: 56, height: 56 }}
                    >
                      <i
                        className={`bi bi-${about.icon} text-primary fs-4`}
                      ></i>
                    </div>
                    <h4 className="fw-bold mb-4">{about.title}</h4>
                    <p className="mb-0">{about.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className="feature-section container-fluid"
          style={{ backgroundColor: "#eff0fc" }}
        >
          <div className="container-lg h-100">
            <div className="row h-100">
              <div className="col-md-6 h-100 d-none d-md-block">
                <div className="d-flex flex-column justify-content-between h-100">
                  <Image
                    src={feature1}
                    alt="mobile app screen"
                    objectFit="contain"
                  />
                  <Image
                    src={feature2}
                    alt="mobile app screen"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="col-md-6 feature-right-side pb-4 d-flex flex-column justify-content-center">
                <Image
                  src={feature1}
                  alt="mobile app screen"
                  objectFit="cover"
                  objectPosition="bottom"
                  height={400}
                />
                <h2 className="h1 fw-extrabold lh-base mb-4 text-center text-md-start">
                  All The <span className="text-primary">Great</span> <br />{" "}
                  FazzPay Features
                </h2>
                {features.map((feature, idx) => (
                  <div
                    className="bg-white rounded p-3 mb-3 shadow"
                    key={feature.title}
                  >
                    <h5 className="fw-semibold mb-2">
                      <span className="text-primary">{idx + 1}. </span>
                      {feature.title}
                    </h5>
                    <p className="mb-0">{feature.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="container-fluid py-5">
          <div className="container-lg text-center py-0 py-md-5">
            <h2 className="fw-extrabold mb-4">
              What Our Users <span className="text-primary">Say</span>
            </h2>
            <p className="mb-5">
              We have some great features from the application and it's totally
              free <br /> to use by all users around the world.
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div
                role="button"
                className="bg-white rounded shadow px-2 py-0 d-none d-sm-block"
                onClick={handlePrev}
              >
                <i className="bi bi-arrow-left fs-2"></i>
              </div>
              <div className="bg-white rounded shadow py-4 px-2 p-md-5 mx-3 mx-md-5">
                <div className="mb-3">
                  <Image
                    src={`https://i.pravatar.cc/400?img=${testimonials[testi].avatar}`}
                    alt="user avatar"
                    className="rounded"
                    width={72}
                    height={72}
                  />
                </div>
                <h4 className="fw-semibold">{testimonials[testi].name}</h4>
                <p className="mb-4">{testimonials[testi].job}</p>
                <p className="mb-0 w-75 mx-auto">
                  {testimonials[testi].content}
                </p>
              </div>
              <div
                role="button"
                className="bg-white rounded shadow px-2 py-0 d-none d-sm-block"
                onClick={handleNext}
              >
                <i className="bi bi-arrow-right fs-2"></i>
              </div>
            </div>
            <div className="d-flex d-sm-none mt-3 justify-content-center">
              <div
                role="button"
                className="bg-white rounded shadow px-2 py-0 me-4"
                onClick={handlePrev}
              >
                <i className="bi bi-arrow-left fs-2"></i>
              </div>
              <div
                role="button"
                className="bg-white rounded shadow px-2 py-0"
                onClick={handleNext}
              >
                <i className="bi bi-arrow-right fs-2"></i>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container-fluid bg-primary">
        <div className="container-lg py-4 py-md-5">
          <div className="row">
            <div className="col-md-3">
              <p className="h3 fw-bold text-white mb-3">FazzPay</p>
              <p className="text-white mb-0">
                Simplify financial needs and saving much time in banking needs
                with one single app.
              </p>
            </div>
            <div className="col-12">
              <hr
                className="text-white mt-4 mb-3"
                style={{ height: 2, opacity: 0.5 }}
              />
            </div>
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-md order-2 order-md-1 text-center text-md-start mt-3 mt-md-0">
              <p className="mb-0 text-white">
                &copy; 2022 FazzPay. All right reserved.
              </p>
            </div>
            <div className="col-md order-1 order-md-2 text-start text-md-end">
              <div className="row">
                <div className="col-md">
                  <span className="text-white me-4">+62 5637 8882 9901</span>
                </div>
                <div className="col-md">
                  <span className="text-white">contact@fazzpay.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
