import { useSelect } from '@mui/base'
import {useState, useEffect} from'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {createDelivery} from '../features/Delivery/deliverySlice'
import { getOnePackage } from '../features/packages/packageSlice'
import Spinner from './Spinner'




function DeliveryForm() {
    let { id } = useParams()
    const { isLoading, isSuccess, message, deliveries, allPackages } = useSelector((state) => state.deliveries)
    const { packages } = useSelector((state) => state.packages)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getOnePackage(id))
        if(packages) {
            setFormData({...packages})
        }
        console.log(packages);    
    }, [getOnePackage])

    const [formData, setFormData] = useState({
        packageId: id,
        pickup_time: '',
        start_time: '',
        end_time: '',
        locationLatitude: packages.to_location.longitude,
        locationLongitude: packages.to_location.latitude,
        status: '',
        deliveryLocation: packages.to_address
    })
    const {packageId, pickup_time, start_time, end_time, locationLatitude, locationLongitude, status, deliveryLocation} = formData
    const dispatch = useDispatch()
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        try {
            await e.preventDefault()
            const deliveryData = await {
                packageId,
                pickup_time,
                start_time,
                end_time,
                locationLatitude,
                locationLongitude,
                status,
                deliveryLocation
            }   
            await dispatch(createDelivery(deliveryData))
           
            setFormData({
                packageId: '',
                pickup_time: '',
                start_time: '',
                end_time: '',
                locationLatitude: '',
                locationLongitude: '',
                status: '',
                deliveryLocation
            })
            navigate('/driver/deliveries')
        }catch (error) {
            console.log(error);
        }
    }
    if(isLoading) {
        return <Spinner />
    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="from-to-details">
                <div>
                <div className="form-group-name" hidden>
                        <label htmlFor="text">Package Id</label>
                        <input type="text" name='packageId' id='packageId' value={id.toString()} disabled />
                    </div>
                <div className="form-group-name">
                        <label htmlFor="text">Package Descriptionn</label>
                        <input type="text" name='packageDescription' id='packageDescription' value={packages.description} disabled />
                    </div>
                <div className="form-group-name">
                        <label htmlFor="text">Delivery Destination</label>
                        <input type="text" name='deliveryLocation' id='deliveryLocation' value={packages.to_address} disabled />
                    </div>
                    <div className="form-group-name">
                        <label htmlFor="text">Pick_up Time</label>
                        <input type="date" name='pickup_time' id='pickup_time' value={pickup_time} onChange={onChange} placeholder="enter package pick_up time" />
                    </div>
                    <div className="form-group-name">
                        <label htmlFor="text">Start Time</label>
                        <input type="date" name='start_time' id='start_time' value={start_time} onChange={onChange} placeholder="enter package delivery start time" />
                    </div>
                    <div className="form-group-name">
                        <label htmlFor="text">End Time</label>
                        <input type="date" name='end_time' id='end_time' value={end_time} onChange={onChange} placeholder="enter package delivery end time" />
                    </div>
                    <div className="form-group-status">
                        <label htmlFor="text">Delivery Status</label>                   
                            <input type="checkBox" name='status' id='status' value="picked up" onChange={onChange} />picked up
                            <input type="checkBox" name='status' id='status' value="in transit" onChange={onChange} />in transit
                            <input type="checkBox" name='status' id='status' value="delivered" onChange={onChange} />delivered
                            <input type="checkBox" name='status' id='status' value= "failed delivery" onChange={onChange} />failed
                    </div>
                    <div className="form-group-location">
                        <label htmlFor="text">Delivery location</label>
                        <input disabled type="number" name='locationLatitude' id='locationLatitude' value={locationLatitude} onChange={onChange} placeholder='latitude'/>
                        <input disabled type="number" name='locationLongitude' id='locationLongitude' value={locationLongitude} onChange={onChange} placeholder='longitude' />
                    </div>
                </div> 
            </div>
            <div className="form-group">
                <button className='btn btn-block' type='submit'>Add Delivery</button>
            </div>
        </form>
    </section>
  )
}

export default DeliveryForm