import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Input,
  ListItemSecondaryAction,
  Checkbox
} from '@material-ui/core';

export default function MainContainer() {
  const [createissue, setCreateissue] = useState("");
  const [issues, setIssues] = useState([]);
  const [updateissue, setUpdateissue] = useState("");

  const createIssue = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3001/api/v1/issues', {
      name: createissue
    })
    .then(response => {
      console.log("registration response", response.data);
      setIssues([...issues, {
        id: response.data.id,
        name: response.data.name
      }]);
      resetTextField();
    })
    .catch(error => {
      console.log("registration error", error);
    });
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:3001/api/v1/issues');
      console.log(result);
      console.log(result.data);
      setIssues(result.data);
    }
    fetchData();
  }, []);

  const deleteIssue = (id) => {
    axios.delete(`http://localhost:3001/api/v1/issues/${id}`)
    .then(response => {
      setIssues(issues.filter(x => x.id !== id));
      console.log("set");
    })
    .catch(data => {
      console.log(data);
    });
  }

  const updateIssue = (id) => {
    axios.patch(`http://localhost:3001/api/v1/issues/${id}`, {
      name: updateissue
    })
    .then(response => {
      setIssues(prevIssues => {
        return prevIssues.map(issue => issue.id === id ? { ...issue, name: response.data.name } : issue);
      });
      console.log(response.data);
    })
    .catch(data => {
      console.log(data);
    });
  }

  const resetTextField = () => {
    setCreateissue('');
  }

  const handleUpdate = (event) => {
    setUpdateissue(event.target.value);
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <form onSubmit={createIssue}>
          <Input
            type="text"
            name="issue"
            value={createissue}
            placeholder="Enter text"
            onChange={event => setCreateissue(event.target.value)}
          />
          <Button
            type="submit"
            variant='contained'
            color='primary'>
            つぶやく
          </Button>
        </form>
        <List
          style={{ marginTop: '48px' }}
          component='ul'
        >
          {issues.map(item => (
            <ListItem key={item.id} component='li' >
              <Checkbox
                value='primary'
                onChange={() => deleteIssue(item.id)}
              />
              <ListItemText>
                ID:[{item.id}]
                Name:[{item.name}]
              </ListItemText>
              <ListItemSecondaryAction>
                <form>
                  <Input
                    type="text"
                    name="issue"
                    value={updateissue}
                    onChange={event => handleUpdate(event)}
                  />
                  <Button
                    type="submit"
                    onClick={() => updateIssue(item.id)}
                  >
                    更新
                  </Button>
                </form>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}
