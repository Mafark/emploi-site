import store from '../store'
import 'whatwg-fetch'
import { browserHistory } from 'react-router'
import { userData, search } from '../actionCreators'
import { correctImg } from './helpers';

export const site = '//emploicore.lod-misis.ru';
export const imgUrl = '//emploicore.lod-misis.ru/images/';

const profile = {
  id: 1,
  name: 'Адольф',
  surname: 'Гитлер',
  middleName: 'Гитлероевич',
  mail: 'kaput@mail.ru',
  institute: 'ИТАСУ',
  course: '5 курс',
  direction: 'Прикладная информатика',
  aboutMe: 'Ich bin schwer zu finden, leicht zu verlieren und unmöglich zu vergessen',
  contacts: [
    {
      name: 'vk',
      value: 'http://vk.com/id123124'
    },
    {
      name: 'skype',
      value: 'Gitleruga228'
    },
    {
      name: 'phoneNumber',
      value: '1823797982'
    }
  ],
  avatar: './img/gitler.jpg',
  tags: ['Жариться', 'на', 'сковородке'],
  portfolio: [
    {
      id: 1,
      title: 'Хапут',
      description: 'In Russland haben Weihnachten und Silvester Plätze getauscht. Weihnachten fällt auf den 7. Januar und wird also nach Silvester gefeiert. Das wichtigste Ereignis des Abends vor Weihnachten ist ein stundenlanger Gottesdienst mit viel Gesang und schöne Lichter-Prozession.',
      imageUrl: './img/logo.png',
      tags: ['Программирование', 'Веб-дизайн', 'Андроид'],
      leader: {
        id: 3,
        name: 'Борис',
        surname: 'Вальдман'
      },
      members: [
        {
          id: 1,
          role: 'Копатель',
          name: 'Жамбыл',
          surname: 'Ермагамбет'
        },
        {
          id: 2,
          role: 'Копатель',
          name: 'Жамбыл',
          surname: 'Ермагамбет'
        },
        {
          id: 3,
          role: 'Тимлид',
          name: 'Борис',
          surname: 'Вальдман'
        }
      ]
    }],
  organizations: [
    {
      id: 1,
      imageUrl: './img/logo.png',
      title: 'Лига'
    },
    {
      id: 2,
      imageUrl: './img/logo.png',
      title: 'Лига'
    }
  ]
}

const project =
  {
    id: 1,
    avatar: null,
    leader: {
      id: 79,
      name: 'Вася',
      surname: 'Пупкин'
    },
    name: 'Emploi',
    description: 'Реализовать свои приобретенные навыки или найти нужного человека себе в команду, в этом вам поможет Emploi',
    tags: ['Программирование', 'Веб-дизайн', 'Андроид'],
    team: [
      {
        id: 21,
        member: {
          id: 79,
          name: "Гоша",
          surname: "Ваниль"
        }
        profession: "Сиделка",
        description: "Хорошая сиделка по отличной цене, очень пригодится, ваще кайф.",
        tags: [
          'Сижу', "Не тужу", 'Кайфую'
        ],
      },
      {
        id: 24,
        profession: "Сиделка",
        description: "Хорошая сиделка по отличной цене, очень пригодится, ваще кайф.",
        tags: [
          'Сижу', "Не тужу", 'Кайфую'
        ]
      }
    ]
  }

export const getCurrentUser = () => {
  fetch(site + '/current/' + localStorage.getItem('token'), {
    method: 'GET'
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then((res) => {
        // res.tags.push('Птички')
        // res.tags.push('Бабочки')
        // res.tags.push('Цветочки')
        console.log(res)
        store.dispatch(userData.updateUser(res))
      })
    } else {
      store.dispatch(userData.updateUser({}))
    }
  })
}

export const authorization = (mail, pass) => {
  const data = {
    mail: mail,
    password: pass
  }
  fetch(site + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then((res) => {
        console.log(res)
        // Checking for profile completeness
        if (res.user) {
          localStorage.setItem('token', res.token)
          store.dispatch(userData.updateUser(res.user))
        } else {
          browserHistory.push('/confirm/' + res.token)
        }
      })
    }
  }, function (error) {
    // console.log(error);
  })
}

export const preRegistration = (mail, pass) => {
  const data = {
    mail: mail,
    password: pass
  }
  fetch(site + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    console.log(response)
  }, function (error) {
    // console.log(error);
  })
}

export const editUser = (token, userData) => {
  return fetch(site + '/users/' + token, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(function (response) {
    console.log(response)
    if (response.status === 200) {
      return response.json()
    }
  })
}

export const confirmToken = (token) => {
  return fetch(site + '/users/confirm/' + token, {
    method: 'POST'
  }).then(function (response) {
    return response
  })
}

export const getUserByID = (id) => {
  return fetch(site + '/users/' + id, {
    method: 'GET'
  }).then(function (response) {
    if (response.status === 200) {
      return response.json()
    }
  })
}

export const uploadFile = (file) => {
  return fetch(site + '/file', {
    method: 'POST',

    body: file
  }).then(function (response) {
    console.log(response)
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }
  })
}

export const editTags = (token, tags) => {
  return fetch(site + '/users/tags/' + token, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tags)
  }).then(function (response) {
    console.log(response)
  })
}







/*Projects*/
export const getProject = (id) => {
  //dell
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let res = Object.assign({}, project);
      res.avatar = correctImg(res.avatar);
      console.log(res);
      resolve(res);
    }, 1000);
  });
  //dell
  return fetch(site + '/projects/' + id, {
    method: 'GET'
  }).then(function (response) {
    if (response.status === 200) {
      return response.json().then(function (res) {
        res.avatar = correctImg(res.avatar);
        console.log(res);
        return res;
      })
    }
  })
}

export const addProject = (project) => {
  /*
    body: {
      avatar,
      name,
      description,
      tags
    }
  */
  return fetch(site + '/projects/', {
    method: 'POST',
    headers: {
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  }).then(function (response) {
    console.log(response);
  })
}

export const editProject = (id, project) => {
  /*
  body: {
    avatar,
    name,
    description,
    tags
  }
  */
  return fetch(site + '/projects/' + id, {
    method: 'PUT',
    headers: {
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  }).then(function (response) {
    console.log(response);
  })
}

export const deleteProject = (id, project) => {
  return fetch(site + '/projects/' + id + '/delete/', {
    method: 'POST',
    headers: {
      'token': localStorage.getItem('token')
    }
  }).then(function (response) {
    console.log(response);
  })
}







/*Vacancies*/
export const addVacancy = (projectID, vacancy) => {
  /*
    body: {
      profession,
      description,
      tags[]
    }
  */
  return fetch(site + '/projects/' + projectID + '/vacancies/', {
    method: 'POST',
    headers: {
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vacancy)
  }).then(function (response) {
    console.log(response);
  })
}

export const editVacancy = (projectID, vacancy) => {
  /*
  body: {
    profession,
    description,
    tags[]
  }
  */
  return fetch(site + '/projects/' + projectID + '/vacancies/', {
    method: 'PUT',
    headers: {
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vacancy)
  }).then(function (response) {
    console.log(response);
  })
}

export const deleteVacancy = (projectID, vacancyID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/delete/', {
    method: 'POST',
    headers: {
      'token': localStorage.getItem('token')
    }
  }).then(function (response) {
    console.log(response);
  })
}

export const assignToVacancy = (projectID, vacancyID, userID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/assign/', {
    method: 'POST',
    headers: {
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      memberId: userID
    })
  }).then(function (response) {
    console.log(response);
  })
}

export const unassignToVacancy = (projectID, vacancyID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/unassign/', {
    method: 'POST',
    headers: {
      'token': localStorage.getItem('token')
    }
  }).then(function (response) {
    console.log(response);
  })
}








export const getStudentsSearchPreview = () => {          // на пустую строку популярные тэги
  /// //////DELETE
  // send data
  let st = store.getState().search.searchString
  console.log('Строка: ', st)
  let tags = store.getState().search.searchSelectedTags
  console.log('Выбранные тэги: ', tags)
  let config = store.getState().search.searchConfig
  console.log('Конфиг ', config)
  console.log('-----------------------------------------')
  // get data
  let mas = []
  for (let i = 0; i < 10; i++) {
    mas = [...mas, {
      id: i,
      name: 'Жамбыл',
      surname: 'Ермагамбет',
      avatar: '/img/avatar.jpg',
      tags: ['Программирование', 'Веб-дизайн', 'Андроид']
    }]
  }
  return {
    tags: ['Программирование', 'Веб-дизайн', 'Заоза'],
    data: mas
  }
  /// //////DELETE

  /*fetch("http://lala.ru/users/search/preview?str=строка&tags=массив&config=jsonОбъект", {
   method: "GET"
   }).then(function (response) {
   response.json().then((res) => {
   if (res.status >= 200 && res.status < 300) {
   return res;
   }
   })
   }, function (error) {
   // console.log(error)
   }); */
}

export const getStudentsSearchDataByPage = () => {
  /// //////DELETE

  /// get page
  let searchData = store.getState().search.searchData
  if (searchData.length % 10 === 0) {
    // let page = searchData.length / 10;
  }
  /// get page
  let mas = []
  for (let i = 0; i < 10; i++) {
    mas = [...mas, {
      id: i,
      name: 'Рамзан',
      surname: 'Кадыров',
      avatar: '/img/avatar.jpg',
      tags: ['Программирование', 'Верстка', 'Аабааа']
    }]
  }
  store.dispatch(search.pushData(mas))
  /// //////DELETE

  let url = 'http://lala.ru/users/byString?s='
  fetch(url, {
    method: 'GET'
  }).then(function (response) {
    response.json().then(res => {
      if (res.status >= 200 && res.status < 300) {

      }
    })
  }, function (error) {
    // console.log(error);
  })
}

export const getProjectsSearchPreview = () => {          // на пустую строку популярные тэги
  /// //////DELETE
  let mas = []
  for (let i = 0; i < 10; i++) {
    mas = [...mas, {
      id: i,
      name: 'JJJJJJJ',
      surname: 'Ермагамбет',
      avatar: '/img/avatar.jpg',
      tags: ['Программирование', 'Веб-дизайн', 'Андроид']
    }]
  }
  return {
    tags: ['UUUUUUFFFFFF', 'Веб-дизайн', 'Андроид'],
    data: mas
  }
  /// //////DELETE
}

export const getProjectsSearchDataByPage = () => {

}

export const getHomePageData = () => {
  fetch('http://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET'
  }).then(function (response) {
    response.json().then(data => {
      // console.log(profile);
    })
  }, function (error) {
    // console.log(error);
  })
}