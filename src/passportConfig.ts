import LocalStrategy from "passport-local";
import { usr } from "./db";



const aa = LocalStrategy.Strategy
export const initializePassport = (passport) => {
  passport.use(
    new aa({ usernameField: 'userName', passwordField: 'password', passReqToCallback: true},
     async (req, userName, password, done) => {
      console.log("2-----------", {req: req.headers, userName, password});
      try {
        const user = await usr.findOne({ userName });
        if (!user) {
          return done('user not found', false);
        }
        if (user.password !== password) {
          return done('password not matching', false);
        }
        return done(null, user);
      } catch (error) {
        console.log("error", error);
        return done(error, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    console.log('0--------', user)
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    try {
      console.log('1---------', id)
      const user = usr.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
