<!-- ![image](https://pyheroku-badge.herokuapp.com/?app=fe-school-api&path=https://fe-school-api.herokuapp.com&style=flat") -->

## GET ##
`https://fe-school-api.herokuapp.com/api/events`
## GET ##
`https://fe-school-api.herokuapp.com/api/events/:id`
## POST ##
`https://fe-school-api.herokuapp.com/api/events/`
<details><summary>Схема</summary>

```json
    {
        "theme": string,
        "comment": string,
        "date": string
    }
```

</details>

## DELETE ##
`https://fe-school-api.herokuapp.com/api/events/:id`

## PUT ##
`https://fe-school-api.herokuapp.com/api/events/`
<details><summary>Схема</summary>

```json
    {
        "id": string,
        "theme": string,
        "comment": string,
        "date": string
    }
```

</details>