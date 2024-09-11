import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import * as post_schema from '../posts/schemas/post_schema.json' with {
	type: 'json',
}
import * as user_register_schema from '../users/schemas/user_register_schema.json' with {
	type: 'json',
}
const ajv = new Ajv()

addFormats(ajv)
ajv.addSchema(post_schema, 'post')
ajv.addSchema(user_register_schema, 'register')

export default ajv
