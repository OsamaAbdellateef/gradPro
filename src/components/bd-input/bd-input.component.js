import React from 'react';
import './bd-input.style.scss';
import { connect } from 'react-redux';
import { handle_change } from '../../redux/user/user.actions';



const BirthDate = ({ handle_change, day, month, year, ...otherProps }) => {
    const days = [];
    const months = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغطسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر']
    const years = [];

    for (let i = 1; i <= 31; i = i + 1) {
        days[i] = i;
    }

    for (let i = 1975; i <= 2020; i++) {
        years[i] = i;
    }

    return (
        <div className="bd">
            <span style={{ display: "block", color: "grey" }}>تاريخ الميلاد</span>
            <select className="w20" {...otherProps} name="age.day" onChange={(e) => {
                handle_change("day", e.target.value)
            }}>
                {
                    days.map(day => (
                        <option>{day}</option>
                    ))
                }
            </select>
            <select className="w30" {...otherProps} name="month" onChange={(e) => {
                handle_change("month", e.target.value)
            }}>
                {
                    months.map(month => (
                        <option>{month}</option>
                    ))
                }
            </select>
            <select className="w50" {...otherProps} name="year" onChange={(e) => {
                handle_change("year", e.target.value)
            }}>
                {
                    years.map(year => (
                        <option>{year}</option>
                    ))
                }
            </select>
        </div>
    )

}



const mapDispatchToProps = dispatch => {
    return {
        handle_change: (name, value) => dispatch(handle_change(name, value))
    }
}


export default connect(null, mapDispatchToProps)(BirthDate);