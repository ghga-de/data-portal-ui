import React from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';

const Searchbar = () => {
    return (
        <Container className='mb-3'>
            <Form onSubmit={() => null}>
                <Form.Group>
                    <div className='input-group p-1'>
                    <Button type="submit" className="bg-primary">
                            <Search />
                        </Button>
                        <Form.Control type="text" placeholder="Search datasets" />
                        
                    </div>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Searchbar;
