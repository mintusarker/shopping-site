import React from "react";
import toast from "react-hot-toast";

const Footer = () => {

  const handler = () => {
    const textArea = document.getElementById("text");
    if (textArea.value) {
      toast.success("Thanks! We received your query.", {
        position: "bottom-left",
        style: {
          borderRadius: "3px",
          background: "#333",
          color: "#fff",
        },
      });
      textArea.value = '';
    } else { 
      toast.error("Please write your query.", {
        position: "bottom-left",
        style: {
          borderRadius: "3px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="absolute bottom-0 left-0 h-0 right-0">
      <footer className=" footer justify-around py-24 bg-gradient-to-t to-slate-800 from-slate-950 text-white">
        <nav>
          <h6 className="footer-title text-white text-xl shadow-m shadow-slate-200">
            Fashion <span className="text-rose-500">Corner</span>
          </h6>
          <div className="flex justify-center items-center gap-1">
            <textarea
              className="py-1 px-2 text-black flex opacity-70 rounded-none w-60 max-w-xs"
              placeholder="send your query"
              name="text"
              id="text"
              required
            ></textarea>
            <button
              onClick={handler}
              className="text-md py-[14px] px-3 bg-slate-300 rounded-sm text-black font-semibold"
            >
              Send
            </button>
          </div>
        </nav>
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
  );
};

export default Footer;
