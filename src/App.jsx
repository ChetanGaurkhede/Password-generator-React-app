import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordReference = useRef(null); 

  // useCallback use to memoise the function for optimization on dependency array, as the dependency changes it memoise the depency
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) str += "!@#$%^&*";
    if (numberAllowed) str += "0123456789";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(index);
    }

    setpassword(pass);
  }, [length, charAllowed, numberAllowed, setpassword]);

  const copyPasswordClipBoard = useCallback(() => {
    passwordReference.current?.select()
    // passwordReference.current?.setSelectionRange(2,10)  //used to select in rage of given reference
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect use to call the function as the depency changes given in the dependency array. if there is no dependency then it will call on mount of the page meas atleast call once
  useEffect(
    () => passwordGenerator(),
    [length, numberAllowed, charAllowed, passwordGenerator]
  );

  return (
    <>
      <div className="max-w-[800px]  p-10 bg-slate-900 m-auto mt-10 rounded-xl text-center">
        <h1 className="text-2xl font-bold py-3">Password generator</h1>
        <div className="p-4 bg-slate-700 rounded-xl flex overflow-hidden shadow-lg mb-4">
          <input
            type="text"
            value={password}
            ref={passwordReference}
            placeholder="Password"
            readOnly
            className="outline-none w-full py-1 px-3 rounded-xl"
          />
          <button
            onClick={copyPasswordClipBoard}
            className="bg-blue-500 px-3 py-0.5 shrink-0 outline-none"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-10 ">
          <div className="flex justify-evenly items-center gap-x-1 ">
            <input
              type="range"
              value={length}
              min={8}
              max={100}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex justify-evenly items-center gap-x-1 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Add Charector</label>
          </div>
          <div className="flex justify-evenly items-center gap-x-1 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Add Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
