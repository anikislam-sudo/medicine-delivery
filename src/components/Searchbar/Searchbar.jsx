import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import classes from './Searchbar.module.css'

export default function Searchbar(props) {
    return (
        <div className={classes.searchbar}>
            <div>
                {props.cross && <span onClick={props.onClick}>x</span>}
                <input type="text" placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
                <FontAwesomeIcon icon={faSearch} height={18} width={18} />
            </div>
        </div>
    )
}
