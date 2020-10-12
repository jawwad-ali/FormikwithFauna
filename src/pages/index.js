import React , {useState} from "react"
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

  const [val , setVal] = useState("")

  return (
    <div className="container row ">
      <div className="col-lg-12">
        <h1>Netlify Functions and Gatsby Together!</h1>
        <Formik
          initialValues={{ message: '' }}
          validate={values => {
            const errors = {};
            if (!values.message) {
              errors.message = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)

            fetch(`/.netlify/functions/add_message`, {
              method: 'post',
              body: JSON.stringify(values)
            })
              .then(response => response.json())
              .then(data => {
                setVal(data)
                console.log(data)
              })

          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  className="form-control"
                />
                <span className="text-danger">
                  {errors.message && touched.message && errors.message}
                </span>

                <div className="mt-2">
                  <button className="btn btn-primary d-block" type="submit" disabled={isSubmitting}>
                    Send Message
                  </button>
                </div>
              </form>
            )}
        </Formik>
      </div>
    </div>
  )
}
