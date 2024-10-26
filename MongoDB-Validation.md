# MongoDB Validation Schema

This is the MongoDB validation schema for the `waiting-list` collection.

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["email", "createdAt"],
    "properties": {
      "email": {
        "type": "string",
        "description": "Required, string, 5-320 chars",
        "minLength": 5,
        "maxLength": 320
      },
      "createdAt": {
        "bsonType": "date",
        "description": "Required, must be in form: new Date(\"2020-01-11T00:00:00.441+00:00\")"
      },
      "name": {
        "type": "string"
      },
      "company_name": {
        "type": "string"
      },
      "position": {
        "type": "string"
      },
      "country": {
        "type": "string"
      },
      "industry": {
        "type": "string"
      },
      "lang": {
        "type": "string",
        "minLength": 2,
        "maxLength": 5,
        "description": "One of: pl, de, en, es, pt",
        "enum": ["pl", "de", "en", "es", "pt"]
      }
    }
  }
}
```
