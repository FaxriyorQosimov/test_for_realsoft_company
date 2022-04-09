import React, { useCallback, useEffect, useState, useTransition } from 'react';
import DatePicker from 'react-datepicker'; // BU YERDA DATEPICKER KALENDAR CHIQARISH UCHUN CHAQIRILGAN
import {collection, onSnapshot, doc, setDoc} from 'firebase/firestore';// FIREBASENING MALUMOTLARNI GET QILISH UCHUN KERAKLI FUNKSIYALAR CHAQIRILGAN 
import {db} from '../../Firebase/config';// CONFIG PAPKANI ICHIDAN DB FIREBASE MALUMOTLAR BAZASI CHAQIRIB OLINGAN
import { useLocation } from 'react-router-dom'; // USELOCATION SAYTNING URL MANZILINI OLISH CHAQIRILGAN
import Modal from '../../ModalForNewStaffs/Modal';//YANGI USERLARNI QO'SHISH UCHUN MODAL COMPONENTI CHAQIRILGAN
import {active, add, all, allSchools, forty, from, internship, nameEmployee, linkAsDirector, monthlySalary, orderNumber, position, school, schools, theadElements, to, trueAndFalse} from '../../Constants'
import Loading from '../../Loading';// FIREBASEDAN MALUMOTLAR KELGUNCHA HARAKTLANIB TURUVCHI ANIMATION LOADING

import 'react-datepicker/dist/react-datepicker.css';// DATEPICKER KALENDAR STYLE CHAQIRILGAN
import classes from '../../Index.module.css';// STAFFINGTABLE PAGEGA STYLE BERISH UCHUN 
import '../../style.css';


function StaffingTable() {
    // // // /// /// // // // BARCHA STATELAR
    const [employees, setEmployees ] = useState(''); // USHBU STATE FIREBASEDAN USER MALUMOTLARNI GET QILIB USHBU STATEGA JOYLAYDI
    const [fromSelectedDate, setFromSelectedDate] = useState(null);//USHBU STATE SANA(DAN)NI O'ZIDA SAQLAYDI
    const [toSelectedDate, setToSelectedDate] = useState(null);//USHBE STATE SANA(GACHA)NI O'ZIDA SAQLAYDI
    const [showModal, setShowModal] = useState(false);//MODALNI OCHILIB YOPILISHINI TAMILAYDIGAN STATE
    const [fromSelectedDateToTable, setFromSelectedDateTable] = useState('');// FIREBASEDAGI SANA(DAN) MALUMOTINI O'ZIDA SAQLASH UCHUN
    const [toSelectedDateToTable, setToSelectedDateTable] = useState('');// FIREBASEDAGI SANA(GACHA) MALUMOTINI O'ZIDA SAQLASH UCHUN
    const [slectedActiveOrNoActive, setSlectedActiveOrNoActive] = useState(null);// USHBU STATE AKTIV YOKI ACTIVE EMASLIGNI CHIQARADIGAN SELECT INPUTINI MALUMOTINI O'ZIDA SAQLAYDI
    const [slectedSchool, setSlectedSchool] = useState('');// USHBU STATE SELECT INPUTINING VALUESINI SAQLAYDI

    // // // // // // // // // USELOCATION FUNKSIYA CHAQIRILGAN
    let location = useLocation()

    // // // // // // // // // FIREBASEDAN MALUMOTLANI GET QILISH UCHUN USEFFECT HOOKIDAN FOYDALANILGAN
    useEffect(()=>{
        const load = async () => {
            // BARCHA USERLAR GET QILINGAN
            onSnapshot(collection(db, 'staffSalaries'),  (snapshot) => 
            setEmployees(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))))
            // QAYSI SANADAN 
            onSnapshot(collection(db, 'fromSelectedDate'),  (snapshot) => 
            setFromSelectedDateTable(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))));
            // QAYSI SANAGACHA
            onSnapshot(collection(db, 'toSelectedDate'),  (snapshot) => 
            setToSelectedDateTable(snapshot.docs.map(  (doc) => ({...doc.data(), defaultId: doc.id}))));
        }
        load()
    }, [])

    // // // // /// / // // / YANGI SANA KIRITILGANDA QIYMATNI JADVALGA SAQLAYDIGAN FUNKSIYA(DAN)
    const handleFromDatePicker = useCallback( async (fromDate) => {
        const date = new Date(fromDate)
        let day = date.getDate()
        let month = date.getMonth() + 1;
        let fullYear = date.getFullYear()
        const docRef1 = await doc(db, 'fromSelectedDate', 'p7xBMwmf7C5hDuEIgNt7');
        const payload1 = await {fromSelectedDate: (day<10?'0'+day:day)+'.'+(month<10?'0'+month:month)+'.'+fullYear}
        setDoc(docRef1, payload1)
        setFromSelectedDate(date)
    }, [fromSelectedDate])

    // // // // /// / // // / YANGI SANA KIRITILGANDA QIYMATNI JADVALGA SAQLAYDIGAN FUNKSIYA(GACHA)
    const handleToDatePicker = useCallback( async (toDate) => {
        const date = new Date(toDate)
        let day = date.getDate()
        let month = date.getMonth() + 1;
        let fullYear = date.getFullYear()
        const docRef1 = await doc(db, 'toSelectedDate', 'rYOdirvhiuDZkGCetl6U');
        const payload1 = await {toSelectedDate: (day<10?'0'+day:day)+'.'+(month<10?'0'+month:month)+'.'+fullYear}
        setDoc(docRef1, payload1)
        setToSelectedDate(date)
    }, [toSelectedDate])

    // // // // // // /// /// USERLANI ACTIVE YOKI NOACTIVE QILADIGAN FUNKSIYA
    const handleCheckboxCustom = useCallback(async (employee) => {
        const docRef1 = await doc(db, 'staffSalaries', employee.defaultId);
        const payload1 = await {...employee, vizible: employee.vizible == true ? false : true}
        setDoc(docRef1, payload1)
    }, []) 

    // // // // // //// /// / SELECT BUTTON ORQALI ACTIVE YOKI NOACTIVELNI JADVALDA CHIQARADIGAN FUNKSIYA
    const changeActiveOrNoActive = (e) => {
        setSlectedActiveOrNoActive(e.target.value)
    }

    // // // // // //// /// / SELECT BUTTON ORQALI TANLANGAN MAKTABNI JADVALDA CHIQARADIGAN FUNKSIYA
    const changeSchool = useCallback((e) => {
        setSlectedSchool(e.target.value)
    },[]) 

    console.log(employees);
    return (
        <section className={classes.staffing_table_page}>
            
            {
                showModal && <Modal employees={employees} setEmployees={setEmployees} showModal={showModal} setShowModal={setShowModal} /> 
            }
            <hgroup className={classes.staffing_table_wrapper}>
            {employees ? <hgroup className={classes.staffing_table}>
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.tr}>
                                <th className={classes.td} rowSpan="3">{orderNumber}</th>
                                <th className={classes.td} colSpan="3">{allSchools}</th>
                                {
                                    location.pathname == '/staff-table-direct' 
                                    && <>
                                        <th className={classes.td} colSpan="8">{monthlySalary}</th> 
                                        <th className={classes.td} rowSpan="3">{forty}</th>
                                    </>
                                }
                                <th className={classes.td} rowSpan="3">{internship}</th>
                                <th className={classes.td} rowSpan="3">{active}</th>
                            </tr>
                            <tr>
                                <th className={classes.td} rowSpan="2">&nbsp;&nbsp;{school}&nbsp;&nbsp;</th>
                                <th className={classes.td} rowSpan="2">{position}</th>
                                <th className={classes.td} rowSpan="2">{nameEmployee}</th>
                                {
                                    location.pathname == '/staff-table-direct' &&
                                    <>
                                        <th className={classes.td} colSpan="4">{fromSelectedDateToTable ? fromSelectedDateToTable[0].fromSelectedDate : '01.01.1991'} y <br/> {from}</th>
                                        <th className={classes.td} colSpan="4">{toSelectedDateToTable ? toSelectedDateToTable[0].toSelectedDate : 3423} y <br/> {to}</th>
                                    </>
                                }
                            </tr>
                            {
                                location.pathname == '/staff-table-direct' 
                                && <> {theadElements.map((theadElement, index) => <th key={index} className={classes.td}>{theadElement}</th>)} </>
                            }
                        </thead>
                        <tbody>
                            {
                               employees && employees.filter(filtered => slectedActiveOrNoActive ? slectedActiveOrNoActive == 'all' ? true : filtered.vizible.toString() == slectedActiveOrNoActive : true)
                               .filter(filtered => slectedSchool ? slectedSchool == 'all' ? true : filtered.school == slectedSchool : true)
                               .map((employee, index) => 
                                    <tr key={employee.id}>
                                        <td>{index+1}</td>
                                        <td>{ employee.school}</td>
                                        <td>{employee.position}</td>
                                        <td>{employee.name}</td>
                                        {
                                            location.pathname == '/staff-table-direct' ? 
                                                <>
                                                    <td>{fromSelectedDateToTable && fromSelectedDateToTable[0].fromSelectedDate.slice(6,10) < 2022 
                                                        ? employee.stavka_1 
                                                        : employee.stavka_2}
                                                    </td>
                                                    <td>{fromSelectedDateToTable && fromSelectedDateToTable[0].fromSelectedDate.slice(6,10) < 2022 
                                                        ? employee.reward_1 
                                                        : employee.reward_2}
                                                    </td>
                                                    <td>
                                                        {
                                                            fromSelectedDateToTable && fromSelectedDateToTable[0].fromSelectedDate.slice(6,10) < 2022 
                                                            ? parseInt(employee.stavka_1) + parseInt(employee.reward_1) 
                                                            : parseInt(employee.stavka_2) + parseInt(employee.reward_2)
                                                        }
                                                    </td>
                                                    <td>{fromSelectedDateToTable && fromSelectedDateToTable[0].fromSelectedDate.slice(6,10) < 2022 
                                                        ? employee.capture_1 
                                                        : employee.capture_2}
                                                    </td>

                                                    <td>{toSelectedDateToTable && toSelectedDateToTable[0].toSelectedDate.slice(6,10) < 2022 
                                                        ? employee.stavka_1 
                                                        : employee.stavka_2}
                                                    </td>
                                                    <td>{toSelectedDateToTable && toSelectedDateToTable[0].toSelectedDate.slice(6,10) < 2022 
                                                        ? employee.reward_1 
                                                        : employee.reward_2}
                                                    </td>
                                                    <td>
                                                        {
                                                            toSelectedDateToTable && toSelectedDateToTable[0].toSelectedDate.slice(6,10) < 2022 
                                                            ? parseInt(employee.stavka_1) + parseInt(employee.reward_1) 
                                                            : parseInt(employee.stavka_2) + parseInt(employee.reward_2)
                                                        }
                                                    </td>
                                                    <td>{toSelectedDateToTable && toSelectedDateToTable[0].toSelectedDate.slice(6,10) < 2022 
                                                        ? employee.capture_1 
                                                        : employee.capture_2}
                                                    </td>
                                                    <td>
                                                        {
                                                            parseFloat(((fromSelectedDateToTable && fromSelectedDateToTable[0].fromSelectedDate.slice(6,10) < 2022 
                                                            && toSelectedDateToTable && toSelectedDateToTable[0].toSelectedDate.slice(6,10) > 2021 ) 
                                                            ? employee.capture_2 / employee.capture_1 * 100 
                                                            : employee.capture_1 / employee.capture_1 * 100) - 100).toFixed(2)
                                                        }
                                                    </td>
                                                </>
                                            : null
                                        }
                                        <td>{employee.internship}</td>
                                        <td>
                                            <article className={classes.custom_checkbox}>
                                                <label onClick={() => handleCheckboxCustom(employee)}>
                                                    <input type="checkbox"/>
                                                    <span className={employee.vizible ? classes.active_span : classes.unactive_span}>
                                                        <i className={employee.vizible ? classes.active_i : classes.unactive_i}></i>
                                                    </span>
                                                </label>
                                            </article>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </hgroup> : <Loading />}
                    
                <footer className={classes.staffing_table_footer }>
                    <figure className={classes.staffing_table_footer_wrapper}>
                        {
                            location.pathname == '/staff-table-direct' ? 
                            <>
                                <figure>
                                    <button className={classes.staffing_table_btn} onClick={()=>setShowModal(prev => !prev)}>{add}</button>
                                        <DatePicker
                                            className={classes.staffing_table_btn}
                                            selected={fromSelectedDate}
                                            onChange={date => handleFromDatePicker(date)}
                                            dateFormat='dd/MM/yyyy'
                                            maxDate={new Date()}
                                            placeholderText="Sanani kiriting..."
                                        />
                                        <DatePicker
                                            className={classes.staffing_table_btn}
                                            selected={toSelectedDate}
                                            onChange={date => handleToDatePicker(date)}
                                            dateFormat='dd/MM/yyyy'
                                            maxDate={new Date()}
                                            minDate={fromSelectedDate} 
                                            placeholderText="Sanani kiriting..."
                                        />
                                </figure>
                            </> : null
                        }
                        <figure>
                            <select onChange={(e)=> changeActiveOrNoActive(e)} className={classes.staffing_table_btn}>
                                <option value={"all"}>{all}</option>
                                { trueAndFalse.map((element, index) => <option key={index} value={element}>{element == "true"? "active" : "active emas"}</option>) }
                            </select>
                            <select onChange={(e)=> changeSchool(e)} className={classes.staffing_table_btn}>
                                <option value={"all"}>{all}</option>
                                {schools.map((school, index) => <option key={index} value={school}>{school}</option>)}
                            </select>
                        </figure>
                    </figure>
                </footer>
            </hgroup>
        </section>
    )
}

export default StaffingTable
