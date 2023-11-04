import React from 'react';
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Getting Started</Link>
                </li>
                <li>
                    <Link to="/schedule">My Schedule</Link>
                </li>
                <li>
                    <Link to="/curriculum">My Curriculum</Link>
                </li>
                <li>
                    <Link to="/resources">My Resources</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation