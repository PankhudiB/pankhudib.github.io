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

function loadWorks(experince) {
    experince.sort(function(a, b) {
        return a.sn - b.sn;
    });
    const works = experince.filter((experince) => experince.type == "work");
    let worksInnerHTML = '';
    for (let i = 0; i < works.length; i++) {
        experienceDetails = ``;

        for (j = 0; j < works[i].experience.length; ++j) {
            team = works[i].experience[j];
            teamExpDetails = ``;
            for (k = 0; k < team.details.length; ++k) {
                if (k !== 0) {
                    teamExpDetails += `<br/>`;
                }
                teamExpDetails += `                    
					<span>- ${team.details[k]}</span>
				`;
            }


            if (j !== 0) {
                experienceDetails += `<br/>`;
            }
            experienceDetails += `                        
			<div class="row team">			    
				<span class="status">${team.team}</span>
				<div class="row">${teamExpDetails}</div>
			</div>
			`;
        }

        worksInnerHTML += `
		<div class="row work">
			<div class="row">
				<div class="col m5 s5">
                    <span class="title">${works[i].organisation}</span>
                    <a href="${works[i].link}" target="_blank"><i class="material-icons">link</i></a>
                </div>
				<div class="col m7 s7 position"><span class="title">${works[i].workPosition}</span></div>
			</div>
			<div class="row golden">
				<div class="col m7 s5" ">${works[i].client}</div>
				<div class="col m5 s7 period">${works[i].periodStart} - ${works[i].periodEnd}</div>
			</div>
			<div class="row details">${experienceDetails}</div>
		</div>`;
    }
    $('#experience').html(`<div class="row section"><h4>Experience</h4>${worksInnerHTML}</div>`);
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
        loadWorks(profile.experince);
        loadSkills(profile.skills);
        console.log('body loaded calling');
        onBodyLoad();
    });
