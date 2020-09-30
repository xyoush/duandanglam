import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { AccountCircle, Lock } from "@material-ui/icons";
import clsx from "clsx";
import React, { Component } from "react";
import styles from "./styles";
import { Mutation } from "react-apollo";

import gql from "graphql-tag";


const LOGIN_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt

      user {
        id

        email

        username

        confirmed

        blocked

        role {
          id

          name

          description

          type
        }
      }
    }
  }
`; //mutation của login, khi submit thì mutation này sẽ được gọi

class Dangnhap extends Component {
  // GrapSQL
//state để lưu dữ liệu
  state = {
    identifier: "",

    password: "",
  };
  render() {
    const { classes } = this.props;
    const { identifier, password } = this.state;
    return (
      <div className={classes.background}>
        <div className={classes.login}>
          {/* <Grid item xs={12}>
            <img
              src="https://i.imgur.com/zkO97SN.png"
              alt="logo"
              className={classes.image}
            />
          </Grid> */}
          <div className={classes.cardavt}>
            <img
              src="https://i.imgur.com/zkO97SN.png"
              alt="logo"
              className={classes.image}
            />
          </div>
          <Card className={classes.card}>
            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CardContent>
                    <form className={classes.form} autoComplete="off">
                      <div className={clsx(classes.editInput)}>
                        <label className={classes.set}>Tài Khoản</label>
                        <TextField
                          id="username"
                          type="email"
                          value={identifier} // lấy value cho variables
                          onChange={(e) =>
                            this.setState({ identifier: e.target.value })
                          }
                          // dữ liệu được điền vào sẽ lưu vào state, và được dùng khi mutation được g
                          InputProps={{
                            className: classes.user,
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <label className={classes.set}>Mật Khẩu</label>
                        <TextField
                          classes={{
                            text: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          id="password"
                          type="password"
                          value={password} // lấy value cho variables
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                          // dữ liệu được điền vào sẽ lưu vào state, và được dùng khi mutation được gử
                          InputProps={{
                            className: classes.pass,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <Mutation
                          mutation={LOGIN_MUTATION} //
                          variables={{ input: { identifier, password } }}
                          onCompleted={() =>
                            this.props.history.push("/trangchu")
                          }
                        >
                          {(mutation) => (
                            //khi login thành công thì sẽ push/chuyển hướng sang trangchu

                            <Button
                              onClick={mutation}
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Đăng Nhập
                            </Button>
                          )}

                          {/* ở trên dùng render props để có thể dùng component Button trong component Mutation */}
                        </Mutation>
                        <a href="/#" className={classes.a}>
                          <Typography className={classes.Fpass}>
                            Quên Mật Khẩu
                          </Typography>
                        </a>
                      </div>
                    </form>
                  </CardContent>
                </Grid>
              </Grid>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dangnhap);
