import React from 'react'
import { doc, setDoc} from 'firebase/firestore'; // FIREBASEGA MALUMOTLARNI SAQLASH UCHUN CHAQIRILGAN
import {db} from '../Firebase/config'; // CONFIG PAPKANI ICHIDAN DB FIREBASE MALUMOTLAR BAZASI CHAQIRIB OLINGAN
import { formElements, saveBtnText, schools, trueAndFalse } from '../Constants'; // O'ZGARUVCHILARNI CHAQIRIB OLINGAN, DINAMIK QILISH UCHUN

import classess from './Modal.module.css'// MODALGA STYLE BERISH UCHUN MODAL.MODULE.CSS PAPKASI CHAQIRILGAN 

function Modal({ setShowModal, employees}) {
    const onHandle = (e) => {
        e.preventDefault()
        const collectionRef =  doc(db, 'staffSalaries', `yangi_list_${employees.length+1}`);
        const payload1 =  {...employees[0], 
            id: employees.length+1, 
            school: e.target[0].value,
            position: e.target[1].value,
            internship: e.target[2].value,
            name: e.target[3].value, 
            stavka_1: e.target[4].value,
            stavka_2: e.target[5].value,
            reward_1: e.target[6].value,
            reward_2: e.target[7].value,
            capture_1: e.target[8].value,
            capture_2: e.target[9].value,
            vizible: e.target[10].value
        };
        setDoc(collectionRef, payload1)
        setShowModal(false)
    }
    return (
        <section className={classess.modal}>
            <hgroup className={classess.modal_opacity}></hgroup>
            <hgroup className={classess.modal_card}>
                <article onClick={()=>setShowModal(false)} className={classess.modal_close}></article>
                <figure className={classess.modal_card_input}>
                    <form action="post" id="post_form" onSubmit={onHandle}>
                        <select>
                            { schools.map((school, index) => <option key={index} value={school}>{school}</option>) }
                        </select>
                        { formElements.map(element => <input required key={element?.id} type={element?.type} placeholder={element?.placeholder} />) }
                        <select>{ trueAndFalse.map((element, index) => <option key={index} value={element}>{element}</option>) }</select>
                        <button form="post_form" type="submit">{saveBtnText}</button>
                    </form>
                </figure>
            </hgroup> 
        </section>
    )
}

export default Modal
