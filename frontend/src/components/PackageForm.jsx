
import {useState} from'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {createPackage} from '../features/packages/packageSlice'




function PackageForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        description: '',
        height: '',
        weight: '',
        depth: '',
        packageStatus: 'open',
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
    const {description, height, weight, depth, width, from_name, from_address, from_locationLatitude, from_locationLongitude, to_address, to_name, to_locationLatitude, to_locationLongitude, packageStatus } = formData
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
            const packageData = await {
                description,
                height,
                weight,
                depth,
                width,
                from_name,
                from_address,
                from_locationLatitude,
                from_locationLongitude,
                to_name,
                to_address,
                to_locationLatitude,
                to_locationLongitude,
                packageStatus
            }   
            await dispatch(createPackage(packageData))
            setFormData({
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
                to_locationLongitude: '',
                packageStatus: 'open'
            })
            console.log(packageData);
            navigate('/client/packages')
        }catch (error) {
            console.log(error);
        }
    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">package description</label>
                <input type="text" name='description' id='description' value={description} onChange={onChange} placeholder='enter package description' />
            </div>
            <div className='inline-form-group'>
                <div className="form-group-details">
                    <label htmlFor="text">package height</label>
                    <input type="number" name='height' id='height' value={height} onChange={onChange} /><span>cm</span>
                </div>
                <div className="form-group-details">
                    <label htmlFor="text">package width</label>
                    <input type="number" name='width' id='width' value={width} onChange={onChange} /><span>cm</span>
                </div>
                <div className="form-group-details">
                    <label htmlFor="text">package weight</label>
                    <input type="number" name='weight' id='weight' value={weight} onChange={onChange} /><span>grams</span>
                </div>
                <div className="form-group-details">
                    <label htmlFor="text">package depth</label>
                    <input type="number" name='depth' id='depth' value={depth} onChange={onChange} /><span>cm</span>
                </div>
            </div>
            <div className="from-to-details">
                <div>
                    <div className="form-group-name">
                        <label htmlFor="text">package from_name</label>
                        <input type="text" name='from_name' id='from_name' value={from_name} onChange={onChange} placeholder="sender's name" />
                    </div>
                    <div className="form-group-address">
                        <label htmlFor="text">package from_address</label>
                        <input type="text" name='from_address' id='from_address' value={from_address} onChange={onChange} placeholder="sender's region" />
                    </div>
                    <div className="form-group-location">
                        <label htmlFor="text">package from_location</label>
                        <input type="number" name='from_locationLatitude' id='from_locationLatitude' value={from_locationLatitude} onChange={onChange} placeholder='latitude'/>
                        <input type="number" name='from_locationLongitude' id='from_locationLongitude' value={from_locationLongitude} onChange={onChange} placeholder='longitude' />
                    </div>
                </div>
                <div>
                    <div className="form-group-name">
                        <label htmlFor="text">package to_name</label>
                        <input type="text" placeholder="receiptient's name" name='to_name' id='to_name' value={to_name} onChange={onChange} />
                    </div>
                    <div className="form-group-address">
                        <label htmlFor="text">package to_address</label>
                        <input type="text" name='to_address' id='to_address' value={to_address} onChange={onChange} />
                    </div>
                    <div className="form-group-location">
                        <label htmlFor="text">package to_location</label>
                        <input type="number" name='to_locationLatitude' id='to_locationLatitude' value={to_locationLatitude} onChange={onChange} placeholder='latitude'/>
                        <input type="number" name='to_locationLongitude' id='to_locationLongitude' value={to_locationLongitude} onChange={onChange} placeholder='longitude' />
                    </div>
                </div>
                <div className="form-group-address" hidden>
                    <label htmlFor="text">package status</label>
                    <input type="text" name='packageStatus' id='packageStatus' value={packageStatus} onChange={onChange} />
                </div>
            </div>
            <div className="form-group">
                <button className='btn btn-block' type='submit'>Add Package</button>
            </div>
        </form>
    </section>
  )
}

export default PackageForm