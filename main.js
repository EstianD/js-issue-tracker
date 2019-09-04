document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// SAVE ISSUES TO LOCAL STORAGE
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    // CREATE ISSUE OBJECT
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    // CHECK IF LOCALSTORAGE ISSUES == NULL
    if(localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();

}

// CLOSE ISSUE
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id){
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

// DELETE ISSUE
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id){
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

// RETRIEVE ISSUES FROM LOCAL STORAGE
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    console.log(issues);

    issuesList.innerHTML = '';

    for(var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="jumbotron">'+
                                    '<h6>Issue ID: ' + id + '</h6>' +
                                    '<p><span class="label label-info">'+status+'</span></p>' +
                                    '<h3>' + desc + '</h3>' +
                                    '<p><span class="glyphicon glyphicon-time">' + severity + '</span></p>' +
                                    '<p><span class="glyphicon glyphicon-user">' + assignedTo + '</span></p>' +
                                    '<a onClick="setStatusClosed(\''+id+'\')" href="#" class="btn btn-warning">Close</a>' +
                                    '<a onClick="deleteIssue(\''+id+'\')" href="#" class="btn btn-danger">Delete</a>' +
                                '</div>';


    }
}