import 'bootstrap/dist/css/bootstrap.min.css';

const EachCard = (props) =>{
    const {details} = props
    const {title,description,date,location,imageUrl} = details
    
    return(
        <li id="each-card-item" className="shadow">
            <img src={imageUrl} />
            <div id="content-container">
                <p>Title: {title}</p>
                <p>Description: {description}</p>
                <p>Date: {date}</p>
                <p>Location: {location}</p>
            </div>
        </li>
    )

}


export default EachCard 