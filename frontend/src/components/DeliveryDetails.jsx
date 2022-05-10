import {useState, useEffect} from'react'
import { useDispatch, useSelector} from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {createDelivery, getOneDelivery, updatedDelivery} from '../features/Delivery/deliverySlice'




function DeliveryDetails() {
    let { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        pickup_time: '',
        start_time: '',
        end_time: '',
        locationLatitude: '',
        locationLongitude: '',
        status: '',
    })
    const {pickup_time, start_time, end_time, locationLatitude, locationLongitude, status} = formData
    const dispatch = useDispatch()
    const { deliveries } = useSelector((state) => state.deliveries)

    useEffect(() => {
      dispatch(getOneDelivery(id))
  }, [getOneDelivery])
  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }))
  }
  useEffect(() => {
      if(deliveries) {
          setFormData({...deliveries})
      }
  }, [deliveries])
    const onSubmit = async (e) => {
        try {
            await e.preventDefault()
            const deliveryData = await {
                pickup_time,
                start_time,
                end_time,
                locationLatitude,
                locationLongitude,
                status
            } 
            await setFormData({
                pickup_time: '',
                start_time: '',
                end_time: '',
                locationLatitude: '',
                locationLongitude: '',
                status: ''
            })
            await dispatch(updatedDelivery(id))
            console.log(id);
            navigate('/driver/deliveries')
        }catch (error) {
            console.log(error);
        }
    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="from-to-details">
                <div>
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
                            <input type="checkBox" name='status' id='status' value= "failed" onChange={onChange} />failed
                    </div>
                    <div className="form-group-location">
                        <label htmlFor="text">Delivery location</label>
                        <input type="number" name='locationLatitude' id='locationLatitude' value={locationLatitude} onChange={onChange} placeholder='latitude'/>
                        <input type="number" name='locationLongitude' id='locationLongitude' value={locationLongitude} onChange={onChange} placeholder='longitude' />
                    </div>
                </div> 
            </div>
            <div className="form-group">
                <button className='btn btn-block' type='submit'>Update Delivery</button>
            </div>
        </form>
    </section>
  )
}

export default DeliveryDetails