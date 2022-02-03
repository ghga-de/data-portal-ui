import React from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';

const Searchbar = () => {
    return (
        <Container className='mb-3'>
            <Form onSubmit={() => null}>
                <Form.Group>
                    <div className='input-group p-1'>
                        <Button type="submit" className="bg-light border-3 border-light text-muted border-right-0">
                            <Search />
                        </Button>
                        <Form.Control type="text" placeholder="Search datasets" className="border-3 border-light border-left-0" />
                    </div>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Searchbar;
