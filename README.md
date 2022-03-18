<!-- ![image](https://pyheroku-badge.herokuapp.com/?app=fe-school-api&path=https://fe-school-api.herokuapp.com&style=flat") -->

## Get all events ##
**GET** `https://fe-school-api.herokuapp.com/api/events`
## Get one event ##
**GET** `https://fe-school-api.herokuapp.com/api/events/:id`
## Create an event ##
**POST** `https://fe-school-api.herokuapp.com/api/events/`
<details><summary>Scheme</summary>

```json
    {
        "theme": "string",
        "comment": "string",
        "date": "string",
        "favorite": "boolean",
        "archive": "boolean"
    }
```

</details>

## Delete event ##
**DELETE** `https://fe-school-api.herokuapp.com/api/events/:id`

## Change an existing event ##
**PUT** `https://fe-school-api.herokuapp.com/api/events/`
<details><summary>Scheme</summary>

```json
    {
        "id": "string",
        "theme": "string",
        "comment": "string",
        "date": "string",
        "favorite": "boolean",
        "archive": "boolean"
    }
```

</details>