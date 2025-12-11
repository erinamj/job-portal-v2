// Job rendering variables - must be declared at the top
let allJobs = []
let currentPage = 1
const jobsPerPage = 8

// Companies variables
let allCompanies = []
let filteredCompanies = []
let currentCompaniesPage = 1
const companiesPerPage = 8

// Load and Display Companies (COMPANIES PAGE ONLY)
function loadCompanies() {
	const companiesGrid = document.getElementById('companies-grid')
	if (!companiesGrid) {
		console.log('Companies grid not found, not on companies page')
		return
	}

	const currentPath = window.location.pathname
	const isCompaniesPage = currentPath.includes('companies.html')

	if (!isCompaniesPage) {
		console.log('Not companies page, skipping loadCompanies')
		return
	}

	console.log('Loading companies...')
	fetch('/companies.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then((data) => {
			console.log('Companies loaded:', data.companies.length)
			allCompanies = data.companies
			filteredCompanies = allCompanies
			currentCompaniesPage = 1
			renderCompanies()
			setupCompaniesFilters()
		})
		.catch((error) => {
			console.error('Error loading companies:', error)
			companiesGrid.innerHTML =
				'<p style="text-align: center; color: #6b7280;">Unable to load companies. Please try again later.</p>'
		})
}

function renderCompanies() {
	const grid = document.getElementById('companies-grid')
	if (!grid) return

	// Update total companies count
	const totalCompaniesElement = document.getElementById('total-companies')
	if (totalCompaniesElement) {
		totalCompaniesElement.textContent = filteredCompanies.length
	}

	// Calculate pagination
	const startIndex = (currentCompaniesPage - 1) * companiesPerPage
	const endIndex = startIndex + companiesPerPage
	const companiesForPage = filteredCompanies.slice(startIndex, endIndex)

	console.log('Rendering companies page:', currentCompaniesPage)
	console.log('Companies for page:', companiesForPage.length)

	// Render company cards
	grid.innerHTML = companiesForPage
		.map(
			(company) => `
		<div class="partner-card">
			<img src="${company.logo}" alt="${company.name} logo" onerror="this.src='../images/prod-img.png'" />
			<h2>${company.name}</h2>
			<p>${company.description}</p>
			<div style="margin-top: auto; padding-top: 12px;">
				<small style="color: #6b7280; display: block; margin-bottom: 8px;">
					${company.industry} • ${company.location}
				</small>
				<a href="${company.website}" target="_blank" rel="noopener noreferrer">Visit</a>
			</div>
		</div>
	`
		)
		.join('')

	// Render pagination
	renderCompaniesPagination()
}

function renderCompaniesPagination() {
	const paginationContainer = document.getElementById(
		'companies-pagination-container'
	)
	if (!paginationContainer) return

	const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage)

	if (totalPages <= 1) {
		paginationContainer.innerHTML = ''
		return
	}

	let paginationHTML = '<div class="pagination">'

	// Previous button
	if (currentCompaniesPage > 1) {
		paginationHTML +=
			'<button class="pagination-btn" onclick="changeCompaniesPage(' +
			(currentCompaniesPage - 1) +
			')">&laquo; Previous</button>'
	} else {
		paginationHTML +=
			'<button class="pagination-btn disabled" disabled>&laquo; Previous</button>'
	}

	// Page numbers
	let startPage = Math.max(1, currentCompaniesPage - 2)
	let endPage = Math.min(totalPages, currentCompaniesPage + 2)

	// First page
	if (startPage > 1) {
		paginationHTML +=
			'<button class="pagination-btn" onclick="changeCompaniesPage(1)">1</button>'
		if (startPage > 2) {
			paginationHTML += '<span class="pagination-dots">...</span>'
		}
	}

	// Page numbers
	for (let i = startPage; i <= endPage; i++) {
		if (i === currentCompaniesPage) {
			paginationHTML +=
				'<button class="pagination-btn active">' + i + '</button>'
		} else {
			paginationHTML +=
				'<button class="pagination-btn" onclick="changeCompaniesPage(' +
				i +
				')">' +
				i +
				'</button>'
		}
	}

	// Last page
	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			paginationHTML += '<span class="pagination-dots">...</span>'
		}
		paginationHTML +=
			'<button class="pagination-btn" onclick="changeCompaniesPage(' +
			totalPages +
			')">' +
			totalPages +
			'</button>'
	}

	// Next button
	if (currentCompaniesPage < totalPages) {
		paginationHTML +=
			'<button class="pagination-btn" onclick="changeCompaniesPage(' +
			(currentCompaniesPage + 1) +
			')">Next &raquo;</button>'
	} else {
		paginationHTML +=
			'<button class="pagination-btn disabled" disabled>Next &raquo;</button>'
	}

	paginationHTML += '</div>'
	paginationContainer.innerHTML = paginationHTML
}

function changeCompaniesPage(pageNumber) {
	currentCompaniesPage = pageNumber
	renderCompanies()

	// Scroll to top of companies section
	const companiesContainer = document.querySelector('.companies-container')
	if (companiesContainer) {
		companiesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
}

function setupCompaniesFilters() {
	const searchInput = document.getElementById('search-input')
	const searchButton = document.getElementById('search-button')
	const industrySelect = document.getElementById('industry-select')

	if (!searchInput || !industrySelect) return

	// Populate industry filter with unique industries from data
	const industries = [...new Set(allCompanies.map((c) => c.industry))].sort()
	industrySelect.innerHTML =
		'<option value="all">All Industries</option>' +
		industries
			.map((industry) => `<option value="${industry}">${industry}</option>`)
			.join('')

	// Search functionality
	const performSearch = (e) => {
		if (e) e.preventDefault()
		const searchTerm = searchInput.value.toLowerCase()
		const selectedIndustry = industrySelect.value

		filteredCompanies = allCompanies.filter((company) => {
			const matchesSearch =
				company.name.toLowerCase().includes(searchTerm) ||
				company.description.toLowerCase().includes(searchTerm) ||
				company.location.toLowerCase().includes(searchTerm)

			const matchesIndustry =
				selectedIndustry === 'all' ||
				company.industry.toLowerCase().includes(selectedIndustry.toLowerCase())

			return matchesSearch && matchesIndustry
		})

		// Reset to page 1 when filtering
		currentCompaniesPage = 1
		renderCompanies()
	}

	// Add event listeners
	if (searchButton) {
		searchButton.addEventListener('click', performSearch)
	}

	searchInput.addEventListener('input', performSearch)
	industrySelect.addEventListener('change', performSearch)

	// Handle form submission
	const form = searchInput.closest('form')
	if (form) {
		form.addEventListener('submit', performSearch)
	}
}

// Load and Display Job Cards (HOME PAGE ONLY)
function loadJobCards() {
	const jobContainer = document.querySelector('.job-all-container')
	if (!jobContainer) {
		console.error('Job container not found')
		return
	}

	// Check if we're on home page
	const currentPath = window.location.pathname
	const isHomePage =
		currentPath.includes('home.html') ||
		currentPath.endsWith('/') ||
		currentPath === '/'

	if (!isHomePage) {
		console.log('Not home page, skipping loadJobCards')
		return // Exit if not home page
	}

	console.log('Loading jobs...')
	fetch('/data.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then((jobs) => {
			console.log('Jobs loaded:', jobs.length)
			// Display first 8 jobs on home page
			const jobsToShow = jobs.slice(0, 8)
			const cardsHTML = jobsToShow.map((job) => createJobCard(job)).join('')
			console.log('Cards HTML type:', typeof cardsHTML)
			console.log('First 200 chars:', cardsHTML.substring(0, 200))
			jobContainer.innerHTML = cardsHTML
		})
		.catch((error) => {
			console.error('Error loading jobs:', error)
			jobContainer.innerHTML =
				'<p class="error-message">Unable to load jobs. Please try again later.</p>'
		})
}

function createJobCard(job) {
	const jobTypeClass = job.type.toLowerCase().replace(/\s+/g, '-')
	const location = job.location.split(',').slice(-2).join(',').trim()
	const description = job.description.substring(0, 100)

	const html =
		'<div class="job-card">' +
		'<div class="job-card-header">' +
		'<div class="company-logo">' +
		'<img src="' +
		job.image +
		'" alt="' +
		job.company +
		' logo" onerror="this.src=\'../images/prod-img.png\'">' +
		'</div>' +
		'<div class="job-type-badge ' +
		jobTypeClass +
		'">' +
		job.type +
		'</div>' +
		'</div>' +
		'<div class="job-card-body">' +
		'<h3 class="job-title">' +
		job.title +
		'</h3>' +
		'<p class="company-name">' +
		job.company +
		'</p>' +
		'<div class="job-details">' +
		'<div class="job-detail-item">' +
		'<svg class="detail-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
		'<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
		'<path d="M8 5V8L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
		'</svg>' +
		'<span>' +
		location +
		'</span>' +
		'</div>' +
		'<div class="job-detail-item">' +
		'<svg class="detail-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
		'<path d="M14 5.33333V2.66667C14 2.29848 13.7015 2 13.3333 2H2.66667C2.29848 2 2 2.29848 2 2.66667V5.33333M14 5.33333V13.3333C14 13.7015 13.7015 14 13.3333 14H2.66667C2.29848 14 2 13.7015 2 13.3333V5.33333M14 5.33333H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
		'</svg>' +
		'<span class="job-salary">' +
		job.salary +
		'</span>' +
		'</div>' +
		'</div>' +
		'<p class="job-description">' +
		description +
		'...</p>' +
		'</div>' +
		'<div class="job-card-footer">' +
		'<a href="' +
		job.link +
		'" class="job-apply-btn">View Details</a>' +
		'</div>' +
		'</div>'

	return html
}

// Load jobs when page loads
const pageCurrentPath = window.location.pathname
const pageIsHomePage =
	pageCurrentPath.includes('home.html') ||
	pageCurrentPath.endsWith('/') ||
	pageCurrentPath === '/'
const pageIsAllJobsPage = pageCurrentPath.includes('view_all_jobs.html')
const pageIsCompaniesPage = pageCurrentPath.includes('companies.html')

if (pageIsHomePage) {
	console.log('Detected home page, loading home cards')
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', loadJobCards)
	} else {
		loadJobCards()
	}
}

if (pageIsAllJobsPage) {
	console.log('Detected all jobs page, loading all jobs')
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', loadJobs)
	} else {
		loadJobs()
	}
}

if (pageIsCompaniesPage) {
	console.log('Detected companies page, loading companies')
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', loadCompanies)
	} else {
		loadCompanies()
	}
}

// Navigation Menu
const navList = document.querySelector('.menu-icon')
const pages = document.querySelector('.menu-list')

// Accessibility: wire up ARIA attributes
if (navList && pages) {
	if (!pages.id) {
		pages.id = 'primary-navigation'
	}
	navList.setAttribute('aria-controls', pages.id)
	navList.setAttribute('aria-expanded', 'false')
	navList.setAttribute('aria-label', 'Open menu')
}

function closeMenu() {
	if (pages) {
		pages.classList.remove('show_menu')
		pages.classList.remove('active')
		document.body.style.overflow = ''
		if (navList) {
			navList.setAttribute('aria-expanded', 'false')
			navList.setAttribute('aria-label', 'Open menu')
		}
	}
}

function openMenu() {
	if (pages) {
		pages.classList.add('show_menu')
		pages.classList.add('active')
		document.body.style.overflow = 'hidden'
		if (navList) {
			navList.setAttribute('aria-expanded', 'true')
			navList.setAttribute('aria-label', 'Close menu')
		}
	}
}

if (navList && pages) {
	// Add close button to mobile menu

	// Toggle menu on hamburger click
	navList.addEventListener('click', function (e) {
		e.stopPropagation()
		if (pages.classList.contains('show_menu')) {
			closeMenu()
		} else {
			openMenu()
		}
	})

	// Close menu when clicking on a link
	const menuLinks = pages.querySelectorAll('a')
	menuLinks.forEach((link) => {
		link.addEventListener('click', function () {
			closeMenu()
		})
	})

	// Close menu when clicking outside (on overlay)
	document.addEventListener('click', function (event) {
		if (
			pages.classList.contains('show_menu') &&
			!pages.contains(event.target) &&
			!navList.contains(event.target)
		) {
			closeMenu()
		}
	})

	// Close menu with Escape key
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && pages.classList.contains('show_menu')) {
			closeMenu()
		}
	})
}

function sendCode() {
	alert('We have sent you an email with the code!')
}
function ruajShenimet() {
	var name = document.getElementById('username')
	var password = document.getElementById('password')

	if (name.value == '') {
		name.style.border = '2px solid red'
	} else {
		name.style.border = 'none'
	}

	if (password.value == '') {
		password.style.border = '2px solid red'
	} else {
		password.style.border = 'none'
	}
}
function ruajRegister() {
	var username = document.getElementById('username')
	var password = document.getElementById('password')
	var email = document.getElementById('email')
	var surname = document.getElementById('surname')
	var name = document.getElementById('name')
	var confpass = document.getElementById('confirmPassword')

	if (name.value == '') {
		name.style.border = '2px solid red'
	} else {
		name.style.border = 'none'
	}

	if (password.value == '') {
		password.style.border = '2px solid red'
	} else {
		password.style.border = 'none'
	}
	if (email.value == '') {
		email.style.border = '2px solid red'
	} else {
		email.style.border = 'none'
	}
	if (surname.value == '') {
		surname.style.border = '2px solid red'
	} else {
		surname.style.border = 'none'
	}
	if (confpass.value == '') {
		confpass.style.border = '2px solid red'
	} else {
		confpass.style.border = 'none'
	}
}

// Load jobs from data.json
function loadJobs() {
	console.log('loadJobs function started')

	console.log('Fetching data.json...')
	fetch('/data.json')
		.then((response) => {
			console.log('Fetch response:', response.ok, response.status)

			if (!response.ok) {
				throw new Error('Failed to fetch: ' + response.status)
			}

			console.log('Parsing JSON...')
			return response.json()
		})
		.then((jobs) => {
			console.log('JSON parsed successfully')
			console.log('Jobs received:', jobs)
			console.log('Jobs length:', jobs.length)

			allJobs = jobs
			console.log('allJobs assigned')
			console.log('All jobs loaded:', allJobs.length)

			if (allJobs.length > 0) {
				console.log('First job:', allJobs[0])
			}

			// Determine current page from URL
			const currentPath = window.location.pathname
			console.log('Current path in loadJobs:', currentPath)

			if (currentPath.includes('vaj2.html')) {
				currentPage = 2
			} else if (currentPath.includes('vaj3.html')) {
				currentPage = 3
			} else if (currentPath.includes('view_all_jobs.html')) {
				currentPage = 1
			} else {
				// Home page - show only first 8 jobs
				currentPage = 1
			}

			console.log('Current page set to:', currentPage)
			console.log('About to call renderJobs')
			renderJobs()
			console.log('renderJobs called')
		})
		.catch((error) => {
			console.error('Error loading jobs:', error)
			console.error('Error stack:', error.stack)
		})
}

// Render jobs to the page
function renderJobs(jobsToRender = null) {
	const jobContainer = document.querySelector('.job-all-container')
	console.log(jobContainer)

	if (!jobContainer) {
		console.log('Job container not found')
		return
	}

	// Clear existing content
	jobContainer.innerHTML = ''

	const jobs = jobsToRender || allJobs

	// Check if we're on view_all_jobs page
	const currentPath = window.location.pathname
	const isAllJobsPage = currentPath.includes('view_all_jobs.html')

	console.log('Current path:', currentPath)
	console.log('Is all jobs page:', isAllJobsPage)
	console.log('Total jobs:', jobs.length)

	if (isAllJobsPage) {
		// Update total jobs count
		const totalJobsElement = document.getElementById('total-jobs')
		if (totalJobsElement) {
			totalJobsElement.textContent = jobs.length
		}

		// Calculate pagination
		const startIndex = (currentPage - 1) * jobsPerPage
		const endIndex = startIndex + jobsPerPage
		const jobsForPage = jobs.slice(startIndex, endIndex)

		console.log('Jobs for page:', jobsForPage.length)

		// Render job cards using the same HTML string method as home page
		const cardsHTML = jobsForPage.map((job) => createJobCard(job)).join('')
		console.log('Cards HTML length:', cardsHTML.length)
		jobContainer.innerHTML = cardsHTML

		// Render pagination
		renderPagination(jobs.length)
	}
}

// Render pagination controls
function renderPagination(totalJobs) {
	const paginationContainer = document.getElementById('pagination-container')
	if (!paginationContainer) return

	const totalPages = Math.ceil(totalJobs / jobsPerPage)

	if (totalPages <= 1) {
		paginationContainer.innerHTML = ''
		return
	}

	let paginationHTML = '<div class="pagination">'

	// Previous button
	if (currentPage > 1) {
		paginationHTML +=
			'<button class="pagination-btn" onclick="changePage(' +
			(currentPage - 1) +
			')">&laquo; Previous</button>'
	} else {
		paginationHTML +=
			'<button class="pagination-btn disabled" disabled>&laquo; Previous</button>'
	}

	// Page numbers
	let startPage = Math.max(1, currentPage - 2)
	let endPage = Math.min(totalPages, currentPage + 2)

	// First page
	if (startPage > 1) {
		paginationHTML +=
			'<button class="pagination-btn" onclick="changePage(1)">1</button>'
		if (startPage > 2) {
			paginationHTML += '<span class="pagination-dots">...</span>'
		}
	}

	// Page numbers
	for (let i = startPage; i <= endPage; i++) {
		if (i === currentPage) {
			paginationHTML +=
				'<button class="pagination-btn active">' + i + '</button>'
		} else {
			paginationHTML +=
				'<button class="pagination-btn" onclick="changePage(' +
				i +
				')">' +
				i +
				'</button>'
		}
	}

	// Last page
	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			paginationHTML += '<span class="pagination-dots">...</span>'
		}
		paginationHTML +=
			'<button class="pagination-btn" onclick="changePage(' +
			totalPages +
			')">' +
			totalPages +
			'</button>'
	}

	// Next button
	if (currentPage < totalPages) {
		paginationHTML +=
			'<button class="pagination-btn" onclick="changePage(' +
			(currentPage + 1) +
			')">Next &raquo;</button>'
	} else {
		paginationHTML +=
			'<button class="pagination-btn disabled" disabled>Next &raquo;</button>'
	}

	paginationHTML += '</div>'
	paginationContainer.innerHTML = paginationHTML
}

// Change page function
function changePage(pageNumber) {
	currentPage = pageNumber
	renderJobs()

	// Scroll to top of jobs section
	const allJobsPage = document.querySelector('.all-jobs-page')
	if (allJobsPage) {
		allJobsPage.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
}

// Create a single job card element
function createJobCardElement(job) {
	const jobListing = document.createElement('div')
	jobListing.className = 'job-listing'
	jobListing.setAttribute('data-job-id', job.id)

	// Job image
	const img = document.createElement('img')
	img.src = job.image
	img.alt = job.title
	img.className = 'job-image'

	// Job title
	const title = document.createElement('h5')
	title.textContent = job.title
	title.className = 'job-title'

	// Company name
	const company = document.createElement('p')
	company.className = 'job-company'
	company.textContent = job.company

	// Location
	const location = document.createElement('p')
	location.className = 'job-location'
	location.innerHTML = `<span class="location-icon">📍</span> ${job.location}`

	// Salary
	const salary = document.createElement('p')
	salary.className = 'job-salary'
	salary.textContent = job.salary

	// Job type badge (moved after salary)
	const typeSpan = document.createElement('span')
	typeSpan.className = 'job-type'
	typeSpan.textContent = job.type
	typeSpan.setAttribute('data-job-type', job.type)

	// Apply button
	const applyButton = document.createElement('button')
	applyButton.type = 'button'
	applyButton.className = 'apply-now'
	applyButton.textContent = 'Apply Now'

	if (job.link && job.link !== '#') {
		const link = document.createElement('a')
		link.href = job.link
		link.appendChild(applyButton)
		jobListing.appendChild(img)
		jobListing.appendChild(title)
		jobListing.appendChild(company)
		jobListing.appendChild(location)
		jobListing.appendChild(salary)
		jobListing.appendChild(typeSpan)
		jobListing.appendChild(link)
	} else {
		jobListing.appendChild(img)
		jobListing.appendChild(title)
		jobListing.appendChild(company)
		jobListing.appendChild(location)
		jobListing.appendChild(salary)
		jobListing.appendChild(typeSpan)
		jobListing.appendChild(applyButton)
	}

	return jobListing
}
