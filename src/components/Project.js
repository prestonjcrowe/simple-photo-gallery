import React from 'react';

function Project(props) {

    const { name, description, url, language  } = props.data;
    return (
        <div className="Project">
            <div className="ProjectLang">{ language }</div>
            <div className="ProjectName"><a href={ url }>{ name }</a></div>
            <div className="ProjectDescription">{ description }</div>
        </div>
    );
}

export default Project;