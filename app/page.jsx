export default function Page() {

  const data = {username: 'ansagang', email: 'ansagaang@gmail.com', password: 'aansag', confirmPassword: 'aansag', lang: 'en'}

  // fetch('http://localhost:3000/api/auth/register?lang=en', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   cache: 'no-cache',
  //   body: JSON.stringify(data),
  // });

  return (
    <>
      <h1>Home</h1>
    </>
  )
}