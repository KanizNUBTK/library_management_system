import React, { useRef, useState } from 'react';
import { CSVLink } from 'react-csv';


const CsvFileDownload = () => {
    const[file,setFile]=useState([]);
    const csvLink = useRef();
    const hanldeCSVFileDownload =e=>{
            fetch(`https://radiant-oasis-30989.herokuapp.com/cart`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setFile(data);
            })
            csvLink.current.link.click()
    }
    return (
        <>
        <button onClick={()=>hanldeCSVFileDownload()}>Download me</button>
        <CSVLink
            data={file}
            filename='studentData.csv'
            className='hidden'
            ref={csvLink}
            target='_blank'
            >
            
        </CSVLink>
        </>
    );
};

export default CsvFileDownload;