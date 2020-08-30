import React from 'react'
import {Button, CardBody, CardHeader, Card} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

const NewsCard = () => {

    return(
        <Card>
            <CardHeader className = "news-header">
              <div>Latest COVID19 News</div>
            </CardHeader>

            <CardBody>
              Get your latest and verified information on the novel coronavirus and current happenings across the world. 

              <div className = "my-3">
                <Button className="news-button" href="https://www.newsnow.co.uk/h/Hot+Topics/Coronavirus+Outbreak" target="_blank" block> Get Started <FontAwesomeIcon icon={faArrowRight} /> </Button>
              </div>
            </CardBody>
          </Card>
    )
}

export default NewsCard