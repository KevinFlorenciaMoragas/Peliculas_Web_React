import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import InputLabel from '../components/InputLabel'
import FormActor from '../components/FormActor'
import FormDirector from '../components/FormDirector'
import FormScreenwritter from '../components/FormScreenwritter'
import FormGenre from '../components/FormGenre'
import FormMovie from '../components/FormMovie'
export default function AdminPanel() {
  return (
    <Tabs defaultActiveKey="profile" id="fill-tab-example" clasName="mb-3" fill>
      <Tab eventKey="actor" title="Actor">
        <FormActor></FormActor>
      </Tab>
      <Tab eventKey="director" title="Director">
        <FormDirector></FormDirector>
      </Tab>
      <Tab eventKey="screenwritter" title="Screenwritter">
        <FormScreenwritter></FormScreenwritter>
      </Tab>
      <Tab eventKey="genre" title="Genre">
        <FormGenre></FormGenre>
      </Tab>
      <Tab eventKey="movie" title="Movie">
        <FormMovie></FormMovie>
      </Tab>
    </Tabs>
  )
}
