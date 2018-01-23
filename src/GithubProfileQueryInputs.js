import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

class GithubProfileQueryInputs extends React.Component {
  constructor(props) {
    super(props);

    const { user, method } = this.props;

    this.state = {
      user,
      method,
    };
  }

  handleChangeUser = event => {
    this.setState({ user: event.target.value });
  };

  handleChangeMethod = event => {
    this.setState({ method: event.target.value });
  };

  handleRefresh = () => {
    const noop = () => {};
    const fn = this.props.onRefresh || noop;

    fn({
      user: this.state.user,
      method: this.state.method,
    });
  };

  render() {
    return (
      <div>
        <div style={styles.field}>
          <TextField
            value={this.state.user}
            onChange={this.handleChangeUser}
            label="User name"
          />
        </div>
        <div style={styles.field}>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Method</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={this.state.method}
              onChange={this.handleChangeMethod}
            >
              <FormControlLabel value="rest" control={<Radio />} label="REST" />
              <FormControlLabel
                value="graphql"
                control={<Radio />}
                label="GraphQL"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div style={styles.field}>
          <Button raised color="primary" onClick={this.handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  field: {
    marginBottom: 16,
  },
};

export default GithubProfileQueryInputs;
