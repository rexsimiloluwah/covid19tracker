import React, {useState, useEffect} from 'react';
import NavBar from './components/NavigationBar'
import LineGraph from './components/LineGraph'
import Dashboard from './components/Dashboard'
import {Container, Col, Row, Card, CardHeader, Table, Button} from 'reactstrap'
import './App.css';
import Select from 'react-select'
import axios from './axios'
import formatDate from './utilities/FormatDate'
import NewsCard from './components/NewsCard'
import Footer from './components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const App = () => {

  let options = [
    {}
  ]

  let dayOptions = [
    {
      value : 7,
      label : "Last 7 Days"
    }, 
    {
      value : 14,
      label : "Last 14 Days"
    }, 
    {
      value : 30, 
      label : "Last 30 Days"
    }, 
    {
      value : 60,
      label : "Last 60 Days"
    }, 
    {
      value : 90, 
      label : "Last 90 Days"
    }
  ]

  const [totalConfirmed, setTotalConfirmed] = useState(0)
  const [totalRecovered, setTotalRecovered] = useState(0)
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [covidData, setCovidData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('GLOBAL COVID19 REPORT')
  const [selectedDays, setSelectedDays] = useState(7)
  const [yAxis, setYAxis] = useState([])
  const [xAxisLabels, setXAxisLabels] = useState([])
  // Similar to the componentDidMount component lifecycle for React classes
  useEffect( () => {
      axios.get('summary')
      .then( (result) => {
          if (result){
            setTotalConfirmed(result.data.Global.TotalConfirmed)
            setTotalRecovered(result.data.Global.TotalRecovered)
            setTotalDeaths(result.data.Global.TotalDeaths)
            setCovidData(result.data)
            
          }
          
      })
      .catch( (err) => {
          console.error(err)
      })
  }, [])

  if(covidData.Countries){
      options = covidData.Countries.map( (country) => {
      return(
        {
          value : country.Slug, 
          label : country.Country
        }
      )
    })

    // console.log(options[0])
  }

    

  const getCoronaReportByDays = (country, from, to) => {
    axios.get(`country/${country}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then( (result) => {
      console.log(result)
      const yAxisReport = result.data.map((obj) => {
        return obj.Cases
      })

      const labels = result.data.map((obj) => {
        return obj.Date
      })

      const countryDetails = covidData.Countries.find( (obj) => obj.Slug === country)

      setYAxis(yAxisReport)
      setXAxisLabels(labels)
      setTotalConfirmed(countryDetails.TotalConfirmed)
      setTotalRecovered(countryDetails.TotalRecovered)
      setTotalDeaths(countryDetails.TotalDeaths)


    })
    .catch( (err) => {
      console.error(err)
    })
  }

  const selectDays = (e) => {
    setSelectedDays(e.value)
    const d = new Date()
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - e.value))

    getCoronaReportByDays(selectedCountry, from, to)
  }

  const selectCountry = (e) => {
    setSelectedCountry(e.value)
    
    const d = new Date()
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - selectedDays))

    getCoronaReportByDays(e.value, from, to)

    // console.log(to, from)

  }

  const SelectComponent = () => (
    <Select options={options} defaultValue="Worldwide" placeholder={selectedCountry}  onChange={selectCountry} className="mb-2" />
  )

  const SelectDayComponent = () => (
    <Select options = {dayOptions} defaultValue ={7}  placeholder = {selectedDays} onChange={selectDays} />
  )

  if(!covidData.Countries){
    // console.log(covidData)
    return(
      <React.Fragment>
      <NavBar />
      <div className = "dashboard container">
        Fetching Data....
      </div>
      </React.Fragment>
    )
  }
 
  return (
    
    <React.Fragment>
          <NavBar />
      <div className = "select">
        <Container>
        <Row>
          <Col md = "9">
            <SelectComponent className = "mb-2" />
          </Col>

          <Col md="3">
            <div>
                <SelectDayComponent className = "mb-2" />
            </div>
          </Col>
        </Row>
        </Container>
      </div>

      <Container fluid>
        <Row>
        <Col md="8">
      <Dashboard 
        totalConfirmed = {totalConfirmed}
        totalRecovered = {totalRecovered}
        totalDeaths = {totalDeaths}
        country = {selectedCountry}
      />

      <Container>
        <Card className="shadow" style={{"border-radius": "10px"}}>
          <CardHeader>Total Confirmed Cases for Each Country (7 Days)</CardHeader>
          <LineGraph  yAxis = {yAxis} xAxisLabels={xAxisLabels} country={selectedCountry} days={selectedDays}/>
        </Card>
      </Container>

      </Col>

      <Col md="4">
        
        <div className = "news my-4 shadow">
          <NewsCard />
        </div>

        <div className="table-data">
        <Table className = "table" striped bordered hover responsive>
            <thead>
              <tr>
                <th>Country</th>
                <th>Confirmed</th>
                <th>Recovered</th>
                <th>Deaths</th>
              </tr>
            </thead>

            <tbody>
              {
                covidData.Countries.slice(0,20).map( (obj) => {
                  return(
                    <React.Fragment>
                    <tr>
                    <td>{obj.Country}</td>
                    <td>{obj.TotalConfirmed}</td>
                    <td>{obj.TotalRecovered}</td>
                    <td>{obj.TotalDeaths}</td>
                    </tr>
                    </React.Fragment>
                  )
                })
              }
            </tbody>
 
        </Table>
            <Button className="news-button" block>See Full list <FontAwesomeIcon icon={faArrowRight} /> </Button>
        </div>
      </Col>
      
      </Row>
      </Container>
      
      <Footer></Footer>
    </React.Fragment>
  );
}



export default App;
