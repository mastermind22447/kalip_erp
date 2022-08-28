import Admin from '../layouts/Admin'

function Index() {

    return (
        <Admin>
            <div>
                Welcome to Next.js!-{process.env.NEXT_SERVER}-
            </div>
        </Admin>
        )
  }
  
  export default Index