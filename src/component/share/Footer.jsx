import React from "react";

const Footer = () => {
  return (
    <div className="">
      <div className="absolute bottom-0 left-0 h-0 right-0">
      <p className="bg-slate-800 text-white text-center pt-9 pb-6 text-3xl font-serif">
        Fashion
      </p>
      <footer className=" footer justify-around py-8 bg-gradient-to-t to-slate-800 from-black text-white">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
    </div>
  );
};

export default Footer;
