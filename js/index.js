function loadLinks(profileLinks) {
    let i = 0;
    profileLinks.sort((a, b) => a.sn - b.sn);
    var profileLinksInnerHTML = '';
    while (i < profileLinks.length) {
        profileLinksInnerHTML += `<span>|</span><span><a href="${profileLinks[i].link}" target="_blank">${profileLinks[i].name}</a></span>`;
        ++i;
    }
    $('#tabs-links').append(profileLinksInnerHTML);
}

function onBodyLoad() {
    $('div.progress').css('display', 'none');
    $('div.content').css('display', 'block');
}

function loadSkills(skills) {
    let i = 0;
    var skillsInnerHTML = '';
    while (i < skills.length) {
        var row = '<div class="row">';
        for (let j = i; j < i + 12 && j < skills.length; j++) {
            if (skills[j][1].startsWith("devicon")) {
                var skill = `
				<div class="col m1 s3 skill">					
					<span class="icon"><i class="${skills[j][1]}"></i></span>				
					<span>${skills[j][0]}</span>
				</div>`;
            } else {
                var skill = `
				<div class="col m1 s3 skill">					
					<span class="icon"><img src="${skills[j][1]}"/></span>				
					<span>${skills[j][0]}</span>
				</div>`;
            }
            row += skill;
        }
        row += '</div>';
        skillsInnerHTML += row;
        i += 12;
    }
    $('#skills').html(`<div class="row section"><h4>Skills</h4>${skillsInnerHTML}</div>`);
}

$.get("js/profile.json",
    function(data, status) {
        console.log('Got profile:', data, ' \nwith status:', status);
        if (status !== "success") {
            window.location.href = "/error.html";
        }
        let profile = data;
        let pInfo = profile.personalInfo;
        $('#name').html(`${pInfo.fname} ${pInfo.lname}<sub>&lt;${pInfo.nick}/&gt;`);
        $('#image img').attr('src', 'img/' + pInfo.myimg);
        $('#contact').html(`<span>${pInfo.mob}</span></br><span><a href="mailto:${pInfo.email}">${pInfo.email}</a></span>`);
        $('#summary').html(profile.summary);
        loadLinks(profile.profileLinks);
        loadSkills(profile.skills);
        console.log('body loaded calling');
        onBodyLoad();
    });
