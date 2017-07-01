import React, {Component} from 'react'

class Organizations extends Component {
  render () {
      if (this.props.user.organizations.length !== 0) {
          return (
                this.props.user.organizations.map((item) => {
                  return (
                      <div>
                          <hr />
                          <h2 className='text-center'>Состоит в организациях</h2>
                          <div className='profile-org small-12 columns'>
                              <div key={item.id}
                                  className='unit small-12 medium-6 large-4 columns end'>
                                  <img alt={item.title} src={item.imageUrl}
                                      className='small-img border' />
                                  <p><a href='./project'>
                                      {item.title}
                                    </a></p>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
      return null
    }
}

export default Organizations
