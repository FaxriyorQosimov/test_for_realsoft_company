import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { russian, uzbek, navs, loginText, asDirector, asEmployee, linkAsDirector, linkAsEmployee } from '../../Constants'; // CONSTANTA O'ZGARUVCHILAR CHAQIRIB OLINADI DINAMIK QILISH UCHUN

import classes from '../../Index.module.css'; // STYLE BERISH UCHUN

function HomePage() {
    const [activeRegister, setActiveRegister] = useState(false)
    return (
        <section>
            <header className={classes.nav_block}>
                <hgroup className={classes.container}>
                    <hgroup className={classes.nav_block_wrapper}>
                        <figure className={classes.nav_block_left}>
                            <a href="#" className={classes.logo}></a>
                            <select className={classes.select_laguage}>
                                <option value={uzbek}>{uzbek}</option>
                                <option value={russian}>{russian}</option>
                            </select>
                            <input type="text" placeholder="Search anything..." className={classes.staffing_table_btn}/>
                        </figure>
                        <figure className={classes.nav_block_right}>
                            <nav>{ navs.map((nav,index)=><a key={index} href="#">{nav}</a>) }</nav>
                            <hgroup className={classes.register_block}>
                                <button className={classes.register_btn} onClick={()=> setActiveRegister(prev => !prev)}>{loginText}</button>
                                <hgroup className={activeRegister ? classes.register_lists : classes.register_lists_none}>
                                    <article>
                                        <Link to={linkAsDirector}>{asDirector}</Link>
                                    </article>
                                    <article>
                                        <Link to={linkAsEmployee}>{asEmployee}</Link>
                                    </article>
                                </hgroup>
                            </hgroup>
                        </figure>
                    </hgroup>
                </hgroup>
            </header>
            <main></main>
        </section>
    )
}

export default HomePage
