
import { Code2, Plus, Briefcase } from 'lucide-react'
import { Card } from '../ui/card'
import { CardHeader , CardTitle} from '../ui/card'
import { CardContent } from '../ui/card'
import React from 'react'
import { Button } from '../ui/button'


const QuickActionWidget = () => {
  return (
    <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                  Add New Project
                </Button>
        
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Code2 className="h-4 w-4 text-green-600" />
                  </div>
                  Update Skills
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Briefcase className="h-4 w-4 text-purple-600" />
                  </div>
                  Update Experience
                </Button>
              </CardContent>
            </Card>
            
          </div>
  )
}

export default QuickActionWidget
