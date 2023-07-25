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
        console.log('body loaded calling');
        onBodyLoad();
    });
