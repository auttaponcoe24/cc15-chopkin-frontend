import React from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (res) => setUser(res),
    onError: (error) => console.log("Login Failed:", error),
  });

  console.log(`USER: `, user);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

  // first-render, render when user change value

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(`RES: `, res.data);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <h2>React Google Login</h2>

      {user ? (
        <div>
          <img src={`${profile.picture}`} alt="user image" />
          <p>ID: {profile.id}</p>
          <p>FirstName: {profile.given_name}</p>
          <p>LastName: {profile.family_name}</p>
          <p>Email Address: {profile.email}</p>
          <button
            onClick={logOut}
            className="bg-secondary py-2 px-4 text-white"
          >
            Log out
          </button>
        </div>
      ) : (
        <button className="flex" onClick={() => login()}>
          <img
            className="border w-[50px]"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABU1BMVEX////oQjQzqFJChPP5uwi90fw0ffI7gPOGq/eErfr5uAD/vAAvp0/oQDLnPS7pMyEnpUrnNiYgpEZDgvr4zsuFxJP3vLjvcWj++e/6wQDnODbnOCjoNCP+9/boLhrnPTX98tonePLn8+n1+vay2brW69r72df85uT+8/Lxf3juYFX4xsL74N7uVUn1oJrsSj3zlI7tbGLsYSv96sH847Dl7fwPoj7I5M1iuHXd5/0yqkNUs2o9rVmxyfn6urbnJw/xioLuZVr1qaXveHD0o3b1nRP81oLqUC/ubif83ZfzkRv2qBH6xUnxgCL4sQv7wSf7x2L7y1Jmm/nM2/360HWfvflXkPT96Lr97s/73Z2TtEVPjffouRBbq0jJtSN5wYmisTNwrULv9P62syrhwEJ2ovY5pHie0ak+j8s7lquWt/k/i9k9kr05m5Y1om+63cA3n4P0NFwRAAAJsElEQVR4nO2c+3caxxWAF4TBhn2xEcjOroiNeEkyINWpIAZLSGrcOnHqxK6dh5PQKm3pM+r//1NnWZCWfbAzd2dmF5/5fvHjHMN+5965987MypIkEAgEAoFAIBAIBAKBQCAQCASpo9NutbYdWq12J+nHoUhn+/Ro/0A9q9Vq2hL0+7PMwf7R6faGm7YPezuZM80yVVXJeFEU1bS0M2Wnd9hO+kFBdKqTvqaVA9Q8ompZ05T96oZZPr44QJGLknNrWlq39zjpx8al3eui2GHbLUGx7Pc2IJKdU6SHHzxPKMta92I3aYW1PJ6YFnn03I6qZU7Sm63bxxrB2guVNLWdVtIqgVQPtFjhc6Fqx4dJ6/g47FLzWzimK47b51T9HMfL9BTW9n6Ntt/csdxLSV3tWSYDP4Ri9dOwHLe7Vvz6Geqo7Sc+mh8xSdBbzEyyYWx1LaZ+GTuMkwRXY496BQ2i3E1qyOkca+xWoBtVqyYi2OozKqF+lNpRAoKnnALoYB1zX4xHNZ6CqKZ2OU84lxpXP4Rq8qw3nYMyb0G0GM+2+Ql2udUYF+UdfoJ9Hl3QJ3jMTbCtJiLIMYIUDioAgvwi2Ml84BGUuh+64EEiVZRfikr7CfRBrhHscZ9kOAtWax+4YDvmbkJR1AWKgv1JPAVjlFFFMcuaZma65zs2510F/bFsYnhyFZwAq4yialZ3cnHYcp2a7XZahxeTrhV1z1G+5CgIW4SKWeuH3++2q5N+bY0k1wi2IZeCqpWZRF0/tCaZsAs5roLSMfEiVFTrvIpz9rBbDb714Ct4StwJVW0f//aodel35CtInKPEN0etc08v4isoXZKNo4p2QH77V824izXPWRRxSFZHTfUU8i27rvM7zoK7fZIcVbQd6H3RtqImIihdkFy/qBoogA6dcysJQaJzC7Mb7/7dzlTegtKEoMxYO3FP309r5XMqj41Pm+COV5vE/77qQfzPION3+CGs9Xg/HA0e5j7/5BNMwRg1JkGeFx/88fdYirWLpJ8VxP0c4sEfPv5QU1SSXhTnil9EKmpJXNPSIOfw4MvM+kw1+Q7K9Pi2uFDMFX+zLoxqP+knhfIyd8ODr8IVFS09b9mR8bCYcymGt41aMq+DUOC52zAX2jbM/aQfFMyrnIfAtqGYKXlLkpyVJM2Fto2EXlmiwXOfIWobijdTVd6bHYr4kjSobWxuHQ1K0qC2YU6Sfk443wcborbhGnAUNfG3eOG8DBZcbRvmps6j0mJbEcaybSjW5q5C6UlIkjph/MIZcDZ5FQb1Crfil/NM1dL7Y1jRhC7DBXbbUHmfi9Fk7TJ0wvjVx9ZmHs04hHTDFcXPzQ1uFdKn0Ya53NfEH/vmDnV+CzRcX2gWS/FT4o+99yhPmUfPgIbfYISweJ/csLBFmcJdoCGGYO4l+cfSN9x6DROMLqUohM9TYbgFM8Qopbnik1QY5mGGa2e2pSH5MmRi+BnIMGzr5OYV4HNZGL4BGb7AMPwmJYawdvGnaENIoWFhWHgLMsRoh4B+z8bwXyDDqJ1FDlZKmRj+DWQYeM7mMXyYDkNgy48WTI1h4R3IEGdnAWiHTGIIG2qEYZoMYWPbJhk+EobCMAzI1iJFhpvU8dkZfpcSQ1i3wJlLUzJ5Aw1xdk8vUmL4HmSIcVxaJD8PZmMIm0s36BQDuHv6llFDZGEIOxL+DqchAoppevb4WCfC36fCEHgShXWqDzhsY2F4B2aI0RAhCzE956U4DRFyFsXCEHiBiNMuACem9/IFInAMYYI4xbSY+4H4Y5/dJQPDEDbS4BTT0o8/GQPgp2MTLQhs+FL07qL0s5zVpzRtAniTjzaEtUMpstSU/pxF6Hs0ffy8jV6I0GYR8TJGKfeX7NxwRtPHz2sMQ9j1obT+Frj0ozwXzMpjmj4+rjBqaeEK/PHhC7H0S3aJ0aAo5ONO9DIEl1IpfIuImsSNYFYe0fPxczc6huCXTaTQjoiaRNYFyyBeRUcwRqGRpL1gwZ9lt2BWztIz8vIMI0mhM9ucrwOC6DQJNwzL6TuMGALfpnHwv3GybBIrGHVaRh4w2n2sZRiQpjdNYjVPWRWb1xgRjLMMJV+aln4JEmRWbHBCuJWHd0OblTQtln4I9GOWpzghhL62d8Mrd4b+FCbIJk9xCin4jOaG222wt0l46in9PQbOwBazV9jcXxr6m8QqJ9RbBsbMjSppjJFtgbOFCmwSHkXKe+G3ODkKfeHLzXyDEdwkvIpNCl43YNVRCkkqzd9vC2sSHmgWVLxFuFWIW0ltnpTCm8QqskxPEcsPflK6yl/Dm4RX0aCUqFfvcQ9VqXzdwMA1RIp0yg2uIIU6M2eItQodTijMb/gRjHF+sUITP4io3FTift1nW9iC92jo2Ux1AkV9FK/eYM1qDvBDNi91kiBmZT1Gpl7dwxeEn3X7mREpZo0hNIyDv7//KIEQIsYExcbOVBk0pdanhp79B64ivVVoMzghMkRhHF+TfsfeTEfrXX76T0xFGgObC6JiYyMbIyLHvZm8+Iqn/8MqpvD7mJAHIMxTx7GBe23TrMi3S10f/RsnjJR64Q0Ek43LUZ5izHH1xsjQV//dfyIVY+/t/VRI89SJhzGuDNZEcq85Q3q+/Hj634jrbSqbCi8j4jx1AqIb8nA2qPs09+qD2TAboDdX/PXdWkWqnWJJHRTEpaUhj4aV2axhM5tVpsMx+rtguzm6vK5t5CmN3B6uSVuGR1PWdWSFQL/KclRGrG0bsJcRo6kAqk0MwtsGkxydM4QnKgQjpG0wqKNLAF0xFsFtg+bE7aNu8FUMahvAn1TDhWg3TEXR1zYKdOdRH8QzeFx0fbVtPKJyvJYqxdW2Af5vPgho8FZEbeNmMeYp7yiCidn5AejjRdvIx7rSxod7oqJMnbeNPMs+sarIu2nYbeOjAj9B1DQix0rqGL++p3owE0V9xHeAQ5zEPmsmZMi599O/ZI5kxnMxymxfgQxhsGYDSxk9S/WCGZv6iFOmGkPG71qHU+GRqXL8+6wYNNnXVH3M/Cce1sM4jLIxTSxDlzRHDB0TD6BDI8soVdEKTDyADnsVg4GjbAyT6RGB1Ke0U1U2RqlI0FuaU5pxlAEXkOypV9Yd05P5pS1+S+qzbPxklXUD504uMa6HRhxJpDeesXr1nxb1wBtBTL1sJc3hu8WWJI3kXC+lqy+QemMqr70gXJHTDX0424zordBsTEf2dWH4oY5s350ao+km2i3ZazYqw/HJiXMx6gL9xYntdt1MyWAWk3pzYF9uL5nNGtdN/9W+QCAQCAQCgUAgEAgEAoFAIBAIWPF/TUtobPce7A4AAAAASUVORK5CYII="
            alt=""
          />
          <div className="h-[50px] px-4 text-white shadow-md bg-blue-400 flex items-center">
            Sign in with Google{" "}
          </div>
        </button>
      )}
    </div>
  );
}
