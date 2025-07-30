export default function HomePage() {
  return (
    <div className="px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Corporate Training
          <span className="text-primary-600"> Reimagined</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Transform your corporate documents into engaging, gamified training experiences. 
          Upload your policies, codes of conduct, and training materials to create interactive 
          learning modules powered by AI.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/upload"
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Get started
          </a>
          <a href="/play" className="text-sm font-semibold leading-6 text-gray-900">
            Try demo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-9.75a3.375 3.375 0 00-3.375 3.375v2.625m15.75 0a3.375 3.375 0 013.375 3.375v6.75a3.375 3.375 0 01-3.375 3.375h-15.75a3.375 3.375 0 01-3.375-3.375v-6.75a3.375 3.375 0 013.375-3.375m15.75 0v.375c0 .621-.504 1.125-1.125 1.125h-15.75c-.621 0-1.125-.504-1.125-1.125v-.375" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Upload Documents</h3>
          <p className="mt-2 text-gray-600">Upload your corporate policies, HIPAA documents, and training materials.</p>
        </div>
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">AI Processing</h3>
          <p className="mt-2 text-gray-600">Our AI analyzes your content and creates engaging training scenarios.</p>
        </div>
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Play & Learn</h3>
          <p className="mt-2 text-gray-600">Engage with interactive games and track your learning progress.</p>
        </div>
      </div>
    </div>
  )
}