import React, { useEffect } from 'react'
import { useSingleVolunteer } from './SingleVolunteerContext'
import { deleteVolunteer, getSingleVolunteer } from '../../actions/singleVolunteerActions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, Typography, Button } from '@mui/material'
import './VolunteerItem.scss'

const VolunteerItem = () => {
  const { state, dispatch } = useSingleVolunteer()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getSingleVolunteer(dispatch, id)
  }, [dispatch, id])

  const deleteButtonHandler = async () => {
    await deleteVolunteer(dispatch, id)
    navigate(`/volunteers`)
  }

  if (state.loading) {
    return <div>Loading...</div>
  }

  if (state.error) {
    return <div>Error: {state.error}</div>
  }

  if (!state.volunteer) {
    return <div>No volunteer found</div>
  }

  return (
    <Card className="volunteer-card">
      <CardContent>
        <Typography variant="h4" component="h1">
          {state.volunteer.name}
        </Typography>
        <Typography variant="body1" component="p">
          Email: {state.volunteer.email}
        </Typography>
        <Typography variant="body1" component="p">
          Description: {state.volunteer.description}
        </Typography>
        <div className="volunteer-actions">
          <Link to={`/volunteer/${id}/edit`}>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Link>
          <Button variant="contained" color="secondary" onClick={deleteButtonHandler}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VolunteerItem