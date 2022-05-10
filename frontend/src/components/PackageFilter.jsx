import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';



function PackageFilter({packages}) {
   // const { packages } = useSelector((state) => state.packages)
  return (
    <section className="heading">
      <div>
        <Button variant="contained">All Packages</Button>
      </div>
      <div>
      <Button variant="contained">Open Packages</Button>
      </div>
      <div>
      <Button variant="contained">Packages In-transit</Button>
      </div>
      <div>
      <Button variant="contained">Closed Packages</Button>
      </div>
    </section>
  )
}

export default PackageFilter