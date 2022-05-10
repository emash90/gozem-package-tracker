import {useState, useEffect} from'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {createPackage, getOnePackage, updatedPackage} from '../features/packages/packageSlice'





function ServicePackage() {
    let { id } = useParams()
    const { packages } = useSelector((state) => state.packages)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        description: '',
        height: '',
        weight: '',
        depth: '',
        width: '',
        from_name: '',
        from_address: '',
        from_locationLatitude: '',
        from_locationLongitude: '',
        to_name: '',
        to_address: '',
        to_locationLatitude: '',
        to_locationLongitude: ''
    })
    const {description, height, weight, depth, width, from_name, from_address, from_locationLatitude, from_locationLongitude, to_address, to_name, to_locationLatitude, to_locationLongitude } = formData
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOnePackage(id))
    }, [getOnePackage])
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    useEffect(() => {
        if(packages) {
            setFormData({...packages})
        }
    }, [packages])
    const handleOnClick = () => {
        navigate(`/driver/createdelivery/${id}`)
    }
  return (
    <section className='form'>
        <form>
            <div className="form-group">
                <label htmlFor="text">package description</label>
                <input disabled type="text" name='description' id='description' value={description} onChange={onChange} placeholder='enter package description' />
            </div>
            <div className='inline-form-group'>
                <div className="form-group-details">
                    <label htmlFor="text">package height</label>
                    <input disabled type="number" name='height' id='height' value={height} onChange={onChange} /><span>cm</span>
                </div>
                <div className="form-group-details">
                    <label htmlFor="text">package width</label>
                    <input disabled type="number" name='width' id='width' value={width} onChange={onChange} /><span>cm</span>
                </div>
                <div className="form-group-details">
                    <label htmlFor="text">package weight</label>
                    <input disabled type="number" name='weight' id='weight' value={weight} onChange={onChange} /><span>grams</span>
                </div>
                <div className="form-group-details">
                    <label htmlFor="text">package depth</label>
                    <input disabled type="number" name='depth' id='depth' value={depth} onChange={onChange} /><span>cm</span>
                </div>
            </div>
            <div className="from-to-details">
                <div>
                    <div className="form-group-name">
                        <label htmlFor="text">package from_name</label>
                        <input disabled type="text" name='from_name' id='from_name' value={from_name} onChange={onChange} placeholder="sender's name" />
                    </div>
                    <div className="form-group-address">
                        <label htmlFor="text">package from_address</label>
                        <input disabled type="text" name='from_address' id='from_address' value={from_address} onChange={onChange} placeholder="sender's region" />
                    </div>
                    <div className="form-group-location">
                        <label htmlFor="text">package from_location</label>
                        <input type="number" name='from_locationLatitude' id='from_locationLatitude' value={from_locationLatitude} onChange={onChange} placeholder='latitude'/>
                        <input disabled type="number" name='from_locationLongitude' id='from_locationLongitude' value={from_locationLongitude} onChange={onChange} placeholder='longitude' />
                    </div>
                </div>
                <div>
                    <div className="form-group-name">
                        <label htmlFor="text">package to_name</label>
                        <input disabled type="text" placeholder="receiptient's name" name='to_name' id='to_name' value={to_name} onChange={onChange} />
                    </div>
                    <div className="form-group-address">
                        <label htmlFor="text">package to_address</label>
                        <input disabled type="text" name='to_address' id='to_address' value={to_address} onChange={onChange} />
                    </div>
                    <div className="form-group-location">
                        <label htmlFor="text">package to_location</label>
                        <input disabled type="number" name='to_locationLatitude' id='to_locationLatitude' value={to_locationLatitude} onChange={onChange} placeholder='latitude'/>
                        <input disabled type="number" name='to_locationLongitude' id='to_locationLongitude' value={to_locationLongitude} onChange={onChange} placeholder='longitude' />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <button className='btn btn-block' type='button' onClick={() => {handleOnClick(id)}} >Deliver Package</button>
            </div>
        </form>
    </section>
  )
}

export default ServicePackage