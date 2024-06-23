import React from 'react';
import ReactDOM from 'react-dom';
import style from './Loader.module.css';

const Loader = () => {
    return ReactDOM.createPortal(
        <>
        <div className={style.modalBackground}>
            <div className={style.inner}>
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <circle className={style.spin} cx="400" cy="400" fill="none"
    r="310" stroke-width="51" stroke="#f8df8c"
    stroke-dasharray="700 1400"
    stroke-linecap="round" />
</svg>
</div>
            </div>



        </>,
        document.getElementById('portal')
    )
}

export default Loader;