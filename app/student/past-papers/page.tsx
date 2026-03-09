import { createClient } from '@/lib/supabase/server'
import { FileText, Download } from 'lucide-react'

export default async function PastPapersPage() {
  const supabase = await createClient()
  
  const { data: papers } = await supabase
    .from('past_papers')
    .select('*, subjects(name)')
    .order('year', { ascending: false })

  const { data: subjects } = await supabase.from('subjects').select('*').order('name')

  const groupedPapers = papers?.reduce((acc: any, paper: any) => {
    const year = paper.year
    if (!acc[year]) acc[year] = []
    acc[year].push(paper)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">UCE Past Papers</h1>
        <p className="text-muted-foreground">Access previous examination papers with marking guides</p>
      </div>

      {groupedPapers && Object.keys(groupedPapers).length > 0 ? (
        <div className="space-y-8">
          {Object.keys(groupedPapers).sort((a, b) => Number(b) - Number(a)).map((year) => (
            <div key={year}>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{year}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {groupedPapers[year].map((paper: any) => (
                  <div key={paper.id} className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shrink-0 text-white">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold mb-1">{paper.title}</h3>
                        <div className="text-sm text-muted-foreground mb-3">
                          {paper.subjects?.name} • {paper.paper_type}
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={paper.file_url}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Paper
                          </a>
                          {paper.marking_guide_url && (
                            <a
                              href={paper.marking_guide_url}
                              target="_blank"
                              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-border rounded-lg text-sm font-medium hover:border-primary hover:scale-105 transition-all"
                            >
                              <Download className="w-4 h-4" />
                              Guide
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-muted-foreground">No past papers available yet</p>
        </div>
      )}
    </div>
  )
}
